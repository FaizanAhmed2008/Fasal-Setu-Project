"""FasalSetu FastAPI backend.

Wires the ML modules in `ml/` to HTTP endpoints the frontend consumes.

This file deliberately keeps the request/response shapes documented in the
ML module docstrings (see the `API contract` lines in each ml/*.py file).
It also re-exports a couple of derived fields the UI relies on (risk_score,
total_expected_profit) so the frontend doesn't have to recompute them.
"""

import json
import os
import sys
from pathlib import Path
from typing import List, Optional

# Make the repo root (where `ml/` lives) importable regardless of the cwd
# the user launches this from. Lets `python main.py` work from inside
# `backend/` as well as from the repo root.
_REPO_ROOT = Path(__file__).resolve().parent.parent
if str(_REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(_REPO_ROOT))

import base64 as b64

from fastapi import FastAPI, HTTPException, Query, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from ml.saturation_risk import saturation_risk
from ml.recommendation import recommend_crops
from ml.market_ops import market_ops
from ml.advisory import advisory_feed
from ml.plant_diagnosis import diagnose_plant_image


app = FastAPI(title="FasalSetu API", version="2.0")

# Permissive CORS for the local dev server / preview.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

MOCK_DATA_PATH = Path(__file__).resolve().parent.parent / "ml" / "mock_data.json"


def _load_data() -> dict:
    if not MOCK_DATA_PATH.exists():
        raise HTTPException(status_code=500, detail="Mock data file not found")
    with MOCK_DATA_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


_MOCK = _load_data()
_DISTRICTS = _MOCK.get("districts", ["Pune", "Nashik", "Aurangabad", "Nagpur"])
_CROP_NAMES = list(_MOCK.get("crops", {}).keys())
_SEASONS = ["Kharif", "Rabi", "Zaid"]


# ---------------------------------------------------------------------------
# Derived-field helpers (kept here so ml/ stays pure)
# ---------------------------------------------------------------------------


def _risk_score(level: str) -> int:
    """Map a risk label to a 0-100 number for the UI gauge."""
    return {"Low": 24, "Medium": 50, "High": 78}.get(level, 50)


def _enrich_recommendation(item: dict, land_size: float) -> dict:
    """Augment an ml/recommendation item with the UI's expected fields."""
    enriched = dict(item)
    enriched["expected_profit_per_acre"] = enriched.get("expected_profit")
    enriched["total_expected_profit"] = round(
        (enriched.get("expected_profit") or 0) * land_size, 2
    )
    risk = enriched.get("saturation_risk", "Medium")
    enriched["risk_score"] = _risk_score(risk)
    return enriched


def _enrich_mandi(mandi: dict) -> dict:
    """Add transport_cost to each mandi so the UI can show it alongside net."""
    distance = mandi.get("distance_km", 0) or 0
    price = mandi.get("price", 0) or 0
    net = mandi.get("net_price", 0) or 0
    return {
        **mandi,
        "market_price": price,
        "transport_cost": round(price - net, 2),
        "net_price": net,
    }


# ---------------------------------------------------------------------------
# Response models (for OpenAPI docs)
# ---------------------------------------------------------------------------


class DistrictOut(BaseModel):
    districts: List[str]


class RecommendationOut(BaseModel):
    crop: str
    expected_profit: int
    expected_profit_per_acre: int
    total_expected_profit: float
    saturation_risk: str
    risk_score: int
    reason: str


class MarketOut(BaseModel):
    crop: str
    season: Optional[str] = None
    mandis: list
    best_mandi: Optional[str]
    sell_window: str


class AdvisoryOut(BaseModel):
    crop: str
    season: Optional[str] = None
    alerts: list


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.get("/")
def root():
    return {
        "message": "FasalSetu API - Market-Linked Crop Intelligence",
        "version": "2.0",
        "endpoints": ["/health", "/districts", "/recommend", "/market", "/advisory"],
    }


@app.get("/health")
def health():
    return {"status": "healthy", "crops": _CROP_NAMES, "districts": _DISTRICTS}


@app.get("/districts", response_model=DistrictOut)
def get_districts():
    return {"districts": _DISTRICTS}


@app.get("/recommend")
def recommend(
    district: str = Query(..., min_length=1),
    land_size: str = Query(..., description="Acres, accepts numeric strings"),
    season: str = Query(..., min_length=1),
):
    if season not in _SEASONS:
        raise HTTPException(
            status_code=400, detail=f"Invalid season '{season}'. Must be one of {_SEASONS}."
        )
    try:
        land_size_f = float(land_size)
    except ValueError:
        raise HTTPException(status_code=400, detail="land_size must be a valid number")
    if land_size_f <= 0:
        raise HTTPException(status_code=400, detail="land_size must be positive")

    raw = recommend_crops(
        {"district": district, "land_size": land_size_f, "season": season},
        _MOCK,
    )
    enriched = [_enrich_recommendation(item, land_size_f) for item in raw]
    return {
        "district": district,
        "land_size": land_size_f,
        "season": season,
        "recommendations": enriched,
    }


@app.get("/market", response_model=MarketOut)
def market(crop: str = Query(..., min_length=1)):
    if crop not in _CROP_NAMES:
        raise HTTPException(status_code=400, detail=f"Unknown crop '{crop}'.")
    raw = market_ops(crop, _MOCK)
    return {
        "crop": crop,
        "mandis": [_enrich_mandi(m) for m in raw.get("mandis", [])],
        "best_mandi": raw.get("best_mandi"),
        "sell_window": raw.get("sell_window", "Not available"),
    }


@app.get("/advisory", response_model=AdvisoryOut)
def advisory(crop: str = Query(..., min_length=1)):
    if crop not in _CROP_NAMES:
        raise HTTPException(status_code=400, detail=f"Unknown crop '{crop}'.")
    return {"crop": crop, "alerts": advisory_feed(crop, _MOCK).get("alerts", [])}


@app.post("/diagnose")
async def diagnose(
    crop: str = Form(...),
    image: UploadFile = File(...),
):
    """Accept a crop name and an uploaded image, return AI plant diagnosis."""
    try:
        contents = await image.read()
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read uploaded image.")

    if not contents:
        raise HTTPException(status_code=400, detail="Uploaded image is empty. Please choose a photo.")

    if len(contents) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image is too large. Please choose one under 15 MB.")

    media_type = image.content_type or "image/jpeg"
    if not media_type.lower().startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must be an image (JPG, PNG or WebP).",
        )

    image_b64 = b64.b64encode(contents).decode("utf-8")
    result = diagnose_plant_image(image_b64, crop, media_type=media_type)
    return result


# ---------------------------------------------------------------------------
# Local dev entrypoint
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
