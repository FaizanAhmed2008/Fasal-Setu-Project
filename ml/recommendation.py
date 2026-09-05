"""Module 2 - Personalized Crop Recommendation.

Combines the farmer's land_size/season (used only as a filter) with each crop's
expected profit and the Saturation Risk from Module 1 to produce a ranked list.
Higher expected profit and lower saturation risk rank higher.

API contract (locked, do not deviate):
    GET /recommend -> [{ crop, expected_profit, saturation_risk: "Low"|"Medium"|"High", reason }]
"""

from .saturation_risk import saturation_risk

# Rank weights. Risk penalty reduces the profit signal when oversupply is likely.
RISK_WEIGHT = {
    "High": 0.10,   # heavily discount expected profit
    "Medium": 0.30,
    "Low": 0.55,
}


def _rank_score(expected_profit, risk_level):
    """Combine expected profit and saturation risk into a single sort key.

    Higher is better. Expected profit is scaled into a comparable range and
    then discounted by how risky the crop currently looks.
    """
    if expected_profit is None:
        return 0.0
    profit_score = expected_profit / 50000.0
    return profit_score * RISK_WEIGHT.get(risk_level, 0.30)


def recommend_crops(input_data, mock_data):
    """Return crops ranked by expected profit and saturation risk.

    Args:
        input_data: dict with at least {"season": str, "land_size": number}.
        mock_data: parsed mock_data.json with a "crops" object, each crop having
            "expected_profit", "history" (for saturation_risk) and "alerts".

    Returns:
        list: [{ crop, expected_profit, saturation_risk, reason }] sorted so the
        best pick is first.
    """
    season = str(input_data.get("season", "")).lower()
    crops = mock_data.get("crops", {})

    results = []
    for name, crop in crops.items():
        # Season is a filter only: a crop qualifies if any of its history
        # records belongs to the requested season.
        history = crop.get("history", [])
        if season:
            matches_season = any(
                season in str(record.get("season", "")).lower()
                for record in history
            )
            if not matches_season:
                continue

        expected_profit = crop.get("expected_profit")

        if expected_profit is None:
            continue

        risk = saturation_risk(history)

        results.append({
            "crop": name,
            "expected_profit": expected_profit,
            "saturation_risk": risk["saturation_risk"],
            "reason": risk["reason"],
        })

    # Sort so lower risk + higher profit rank first.
    results.sort(
        key=lambda r: _rank_score(r["expected_profit"], r["saturation_risk"]),
        reverse=True,
    )
    return results
