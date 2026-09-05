import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from services.saturation import saturation_risk  # noqa: E402


def make_history(prices, areas):
    """Build a list of season records from parallel price/area lists."""
    return [
        {"season": f"Season {i + 1}", "avg_price": p, "planted_area": a}
        for i, (p, a) in enumerate(zip(prices, areas))
    ]


def test_high_risk():
    """Both price and area increased significantly -> High risk."""
    result = saturation_risk(make_history([2000, 2400, 2900], [10000, 12000, 15000]))
    assert result["saturation_risk"] == "High"
    assert "high risk of oversupply" in result["reason"].lower()


def test_low_risk():
    """Price increased but planted area stayed flat -> Low risk."""
    result = saturation_risk(make_history([2000, 2400, 2900], [10000, 10100, 10200]))
    assert result["saturation_risk"] == "Low"
    assert "low risk of oversupply" in result["reason"].lower()


def test_medium_risk():
    """Mixed conditions that hit neither High nor Low branch -> Medium."""
    result = saturation_risk(make_history([2000, 2050, 2100], [10000, 12000, 14000]))
    assert result["saturation_risk"] == "Medium"


def test_reason_generation():
    """Reason text is generated with real percentages."""
    result = saturation_risk(make_history([2200, 2690, 3280], [12000, 13680, 15567]))
    assert "reason" in result
    assert len(result["reason"]) > 50
    assert "%" in result["reason"]


def test_edge_case_zero_division():
    """Zero prior price/area must not cause a division by zero or crash."""
    result = saturation_risk(make_history([0, 100, 200], [0, 50, 100]))
    assert result["saturation_risk"] in ("Low", "Medium", "High")
    assert isinstance(result["price_rise_pct"], float)
    assert isinstance(result["area_rise_pct"], float)


def test_risk_score_bounds():
    """Risk verdict stays a valid enum value even for extreme history."""
    result = saturation_risk(make_history([100, 1000, 10000], [100, 1000, 10000]))
    assert result["saturation_risk"] in ("Low", "Medium", "High")


def test_short_history():
    """Fewer than two seasons is treated as Medium risk, without crashing."""
    result = saturation_risk(make_history([2000], [10000]))
    assert result["saturation_risk"] == "Medium"
    assert "Not enough season history" in result["reason"]


if __name__ == "__main__":
    test_high_risk()
    test_low_risk()
    test_medium_risk()
    test_reason_generation()
    test_edge_case_zero_division()
    test_risk_score_bounds()
    test_short_history()
    print("\nAll saturation engine tests passed!")