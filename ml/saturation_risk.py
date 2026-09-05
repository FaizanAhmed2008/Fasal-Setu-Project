"""Module 1 - Saturation Risk Engine.

This is FasalSetu's core differentiator: for a given crop we look at how its
most recent prices moved and how the farming community responded by planting
more or less area. When both prices AND planted area are already rising sharply,
a supply glut is likely - we flag it as HIGH saturation risk so a farmer can
pick a smarter alternative instead.

Everything here is plain, rule-based Python over the mock JSON - no ML training,
no external model calls, no dataset feeding.

API contract this feeds into (locked, do not deviate):
    GET /recommend -> [{ crop, expected_profit, saturation_risk: "Low"|"Medium"|"High", reason }]
"""

import json
from pathlib import Path

from .config import HIGH_RISE_THRESHOLD, LOW_RISE_THRESHOLD


def _pct_rise(last, prior):
    """Return the fractional rise of `last` over `prior`.

    Returns 0.0 instead of raising when `prior` is zero so the engine never
    crashes on zero-value history.
    """
    if prior is None or prior == 0:
        return 0.0
    return (last - prior) / prior


def saturation_risk(crop_history):
    """Compute the saturation risk for a single crop.

    Args:
        crop_history: List of season records (oldest -> newest), each shaped as
            {"season": str, "avg_price": number, "planted_area": number}.

    Returns:
        dict: {
            "saturation_risk": "Low" | "Medium" | "High",
            "price_rise_pct": float,   # fractional, e.g. 0.22
            "area_rise_pct": float,    # fractional, e.g. 0.18
            "reason": str   # plain-language explanation with the real numbers
        }
    """
    if crop_history is None or len(crop_history) < 2:
        return {
            "saturation_risk": "Medium",
            "price_rise_pct": 0.0,
            "area_rise_pct": 0.0,
            "reason": (
                "Not enough season history to assess saturation pressure - "
                "treat this crop as moderate risk for now."
            ),
        }

    # Use the two most recent seasons (oldest -> newest order).
    prior = crop_history[-2]
    last = crop_history[-1]

    price_rise_pct = _pct_rise(last["avg_price"], prior["avg_price"])
    area_rise_pct = _pct_rise(last["planted_area"], prior["planted_area"])

    price_pct_100 = round(price_rise_pct * 100)
    area_pct_100 = round(area_rise_pct * 100)

    if price_rise_pct > HIGH_RISE_THRESHOLD and area_rise_pct > HIGH_RISE_THRESHOLD:
        risk = "High"
        reason = (
            f"Prices rose {price_pct_100}% last season, and planted area is already "
            f"up {area_pct_100}% - high risk of oversupply."
        )
    elif price_rise_pct > HIGH_RISE_THRESHOLD and area_rise_pct <= LOW_RISE_THRESHOLD:
        risk = "Low"
        reason = (
            f"Prices rose {price_pct_100}% last season, but planted area has not "
            f"caught up ({area_pct_100}%) - low risk of oversupply, still a good "
            f"opportunity."
        )
    else:
        risk = "Medium"
        reason = (
            f"Prices moved {price_pct_100}% and planted area moved {area_pct_100}% "
            f"last season - moderate saturation risk."
        )

    return {
        "saturation_risk": risk,
        "price_rise_pct": price_rise_pct,
        "area_rise_pct": area_rise_pct,
        "reason": risk_reason(risk, price_pct_100, area_pct_100),
    }


def risk_reason(risk, price_pct_100, area_pct_100):
    """Return the human-friendly reason string for a risk verdict."""
    if risk == "High":
        return (
            f"Prices rose {price_pct_100}% last season, and planted area is already "
            f"up {area_pct_100}% - high risk of oversupply."
        )
    if risk == "Low":
        return (
            f"Prices rose {price_pct_100}% last season, but planted area has not "
            f"caught up ({area_pct_100}%) - low risk of oversupply, still a good "
            f"opportunity."
        )
    return (
        f"Prices moved {price_pct_100}% and planted area moved {area_pct_100}% "
        f"last season - moderate saturation risk."
    )


def score_all_crops(mock_data):
    """Run saturation_risk() over every crop in the mock data.

    Args:
        mock_data: dict (parsed from mock_data.json) with a "crops" object that
            maps crop name -> {"history": [...]}.

    Returns:
        dict: crop name -> result from saturation_risk().
    """
    crops = mock_data.get("crops", {})
    return {
        name: saturation_risk(crop.get("history", []))
        for name, crop in crops.items()
    }


if __name__ == "__main__":
    DATA_PATH = Path(__file__).parent / "mock_data.json"
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for crop, result in score_all_crops(data).items():
        print(f"{crop}: {result['saturation_risk']} "
              f"(price {result['price_rise_pct']*100:.1f}%, "
              f"area {result['area_rise_pct']*100:.1f}%)")
        print(f"  -> {result['reason']}")
