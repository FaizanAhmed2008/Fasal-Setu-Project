# FasalSetu — Prototype PRD

**Data:** Mocked/sample dataset (no live API calls)
**Scope:** All 4 modules present, kept intentionally shallow, one clean end-to-end demo flow

---

## 1. Goal (what "done" looks like)

A working web app where a user can:
1. Enter a location + land size + season
2. See a ranked crop list where the #1 "obvious" crop is flagged **High Saturation Risk**, and a smarter alternative is recommended instead — with a plain-language reason
3. See a mandi comparison + suggested sell window for the chosen crop
4. See 2–3 rural advisory alerts (weather + pest) for that crop

That single flow **is** the demo. Everything else is decoration.

## 2. Explicit Non-Goals for this build
- No live data.gov.in / Agmarknet / IMD API calls
- No real ML training pipeline — Saturation Risk and price forecast are **precomputed/rule-based**, not live-trained models
- No auth, no database persistence beyond in-memory/JSON
- No SMS/voice conversion for the advisory feed — just a UI mock of it
- No multi-state support — 1 state, 4 crops, hardcoded

## 3. Data Plan (Mocked)
Single JSON file (`mock_data.json`) is the entire "backend truth," covering:

- **4 crops** (e.g. Tomato, Onion, Wheat, Cotton) in **1 state**
- Per crop, **3 seasons of history**: avg mandi price, total planted area (or a proxy number for it)
- Per crop, a precomputed **Saturation Risk Score** (Low/Medium/High) — see Module 1 below for exactly how this is derived, so it isn't just a hardcoded label
- 3–4 **mandis** with static distance + last known price for each crop, used to compute net price (price − flat transport-cost-per-km estimate)
- A static "best sell window" string per crop (e.g. "Next 10–14 days")
- 2–3 canned **weather/pest advisory messages** per crop

## 4. Module 1 — Saturation Risk Engine (Core Differentiator — do not shortcut this one)

This is the one feature that makes FasalSetu different from every other crop-advisory tool, so it needs real logic behind it, even at prototype scale — not a hardcoded Low/Medium/High per crop.

**What it answers:** "Even if this crop is profitable right now, how many other farmers are about to plant it too?"

**Simplified logic for the prototype** (rule-based stand-in for the real price-elasticity-of-supply model):

```
For each crop:
  price_rise_pct   = (last_season_price - prior_season_price) / prior_season_price
  area_rise_pct    = (last_season_area  - prior_season_area)  / prior_season_area

  if price_rise_pct > threshold_high AND area_rise_pct > threshold_high:
      risk = "High"      # price spiked, and farmers already responded by planting more
  elif price_rise_pct > threshold_high AND area_rise_pct <= threshold_low:
      risk = "Low"       # price spiked, but area hasn't caught up yet — good opportunity
  else:
      risk = "Medium"
```

- Thresholds are hand-tuned constants, not learned — that's fine for the prototype, but they must live in one config spot, not be scattered.
- Every risk score **must** come with a generated reason string, e.g. *"Tomato prices rose 22% last season, and planted area is already up 18% — high risk of oversupply."* This reason string is what gets read out loud in the demo, so the wording matters as much as the score.
- This function must be a **real, callable function that takes the JSON data and returns a score** — never a lookup table of `{crop: "High"}`. Anyone reviewing the code should be able to see the actual comparison happening.

## 5. Feature Breakdown by Module

| Module | Prototype-scope definition |
|---|---|
| 1. Saturation Risk Engine | See Section 4 above — rule-based function, real logic, generated reason text. |
| 2. Personalized Recommendation | Combine: input land size/season (filter only) + static "expected profit" number per crop + Saturation Risk from Module 1 → sort and return ranked list with reason text. |
| 3. Market Ops Layer | Given a crop, loop mandi list, compute `price - (distance * flat_rate)`, sort, show best mandi + static sell-window string. |
| 4. Rural Advisory Feed | Given a crop, return its 2–3 canned alert strings from JSON. Style as SMS/alert cards. |

## 6. Screens

1. **Input screen** — location (dropdown, 1 state so just district/land size/season)
2. **Recommendation results** — ranked crop cards, each with a risk-gauge/badge (Low/Med/High color-coded) and the plain-language reason
3. **Crop detail / Market Ops** — mandi comparison table or simple bar list + sell-window banner
4. **Advisory feed** — 2–3 alert-style cards (weather icon + pest tip)

Keep it to these 4 screens. No settings, no login, no extra nav.

## 7. Tech Stack

| Layer | Tech | Note |
|---|---|---|
| Frontend | React (Vite) + Tailwind | Skip Recharts/Leaflet unless time allows — a styled badge/list beats a half-built chart |
| Backend | FastAPI (Python) | Serves the mock JSON + the 4 module functions as endpoints |
| "ML" | plain Python functions over the JSON | No scikit-learn/Prophet training in-session |
| DB | none — JSON file read into memory | Skip SQLite setup entirely |
| Deploy | optional, only once the local demo works end-to-end | Vercel/Render if time remains |

## 8. API Contract (this is the shared interface — lock it before parallel work starts)

```
GET  /recommend?district=&land_size=&season=
  → [{ crop, expected_profit, saturation_risk: "Low"|"Medium"|"High", reason }]

GET  /market?crop=
  → { mandis: [{ name, distance_km, price, net_price }], best_mandi, sell_window }

GET  /advisory?crop=
  → { alerts: [{ type: "weather"|"pest", message }] }
```

## 9. Vibe-Coding Build Order (sequence, not a timeline)

Since this is being built in parallel by multiple people, the **order things get built in matters more than how long each takes** — building in the wrong order is what causes merge conflicts and blocked work. Follow this sequence:

**Stage 1 — Must happen first, together, before anyone codes solo:**
1. Agree on the exact contents and shape of `mock_data.json` (which crops, which fields)
2. Agree on the API contract in Section 8 exactly as written — this is the seam between frontend and backend, don't let it drift once work splits up
3. Repo scaffolded (FastAPI + Vite folders exist, empty but running)

*Nothing downstream should start until these three are settled — everyone is building against guesses otherwise.*

**Stage 2 — Can happen in parallel once Stage 1 is locked:**
- `mock_data.json` gets filled with real-looking numbers
- Module 1 (Saturation Risk Engine) gets written and unit-tested against the mock data *before* it's wired into an endpoint — test it standalone first
- Frontend screens get built against **hardcoded dummy JSON that matches the API contract shape** — don't wait for the real backend to be live to start UI work

**Stage 3 — Only after Stage 2's pieces individually work:**
- Modules 2, 3, 4 get written, each calling Module 1's function where needed (Module 2 depends on Module 1 — build Module 1 first)
- FastAPI endpoints get wired to the module functions
- Frontend swaps its dummy JSON for real calls to the live backend endpoints, one endpoint at a time (start with `/recommend` since it's the screen judges see first)

**Stage 4 — Integration pass, last:**
- Full flow tested screen-by-screen against the real backend
- Reason-text wording polished on the recommendation screen specifically, since that's the screen that carries the core pitch
- Cut anything not working cleanly rather than debugging live — a smaller working flow beats a bigger broken one

## 10. Cut List (if time runs short, cut in this order)
1. Rural Advisory Feed → reduce to 1 static card instead of building the loop
2. Mandi comparison table → reduce to just showing the best mandi + net price, skip the full list
3. Multiple crops in recommendation list → reduce to top pick + 1 alternative only
4. Any deployment step → run locally, screen-share/record the demo instead

## 11. Open Questions (resolve during Stage 1)
- Which 1 state and which 4 crops for the mock data? (Tomato/Onion are strong for the cobweb narrative)
- Exact wording/colors for the risk badges, so frontend and the risk engine's output labels match exactly
- Exact threshold values for the Saturation Risk Engine's price_rise/area_rise cutoffs
