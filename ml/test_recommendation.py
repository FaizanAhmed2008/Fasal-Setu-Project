"""Pytest tests for Module 2 - Personalized Recommendation."""

import pytest

from ml.recommendation import recommend_crops


@pytest.fixture
def mock_data():
    return {
        "crops": {
            "Tomato": {
                "expected_profit": 45000,
                "history": [
                    {"season": "Kharif 2023", "avg_price": 2200, "planted_area": 12000},
                    {"season": "Kharif 2024", "avg_price": 2690, "planted_area": 14000},
                    {"season": "Kharif 2025", "avg_price": 3280, "planted_area": 16500},
                ],
            },
            "Onion": {
                "expected_profit": 39000,
                "history": [
                    {"season": "Kharif 2023", "avg_price": 1800, "planted_area": 25000},
                    {"season": "Kharif 2024", "avg_price": 2100, "planted_area": 25200},
                    {"season": "Kharif 2025", "avg_price": 2600, "planted_area": 25400},
                ],
            },
            "Wheat": {
                "expected_profit": 32000,
                "history": [
                    {"season": "Rabi 2023", "avg_price": 2000, "planted_area": 50000},
                    {"season": "Rabi 2024", "avg_price": 2050, "planted_area": 54000},
                    {"season": "Rabi 2025", "avg_price": 2100, "planted_area": 59000},
                ],
            },
        }
    }


def test_output_shape(mock_data):
    """Result must match the locked API contract fields."""
    result = recommend_crops(
        {"district": "Pune", "land_size": 3.5, "season": "Kharif"}, mock_data
    )
    assert isinstance(result, list)
    for item in result:
        assert set(item.keys()) == {
            "crop", "expected_profit", "saturation_risk", "reason"
        }
        assert item["saturation_risk"] in ("Low", "Medium", "High")
        assert isinstance(item["reason"], str) and item["reason"]


def test_season_filter(mock_data):
    """Kharif excludes Rabi-only Wheat crop."""
    result = recommend_crops(
        {"district": "Pune", "land_size": 3.5, "season": "Kharif"}, mock_data
    )
    crops = {r["crop"] for r in result}
    assert "Tomato" in crops and "Onion" in crops
    assert "Wheat" not in crops


def test_ranking_low_risk_higher_than_high_risk(mock_data):
    """Given similar profits, lower-risk crop should rank above higher-risk."""
    result = recommend_crops(
        {"district": "Pune", "land_size": 3.5, "season": "Kharif"}, mock_data
    )
    names = [r["crop"] for r in result]
    # Tomato = High risk, Onion = Low risk, so Onion should be first.
    assert names.index("Onion") < names.index("Tomato")


def test_reason_from_module1(mock_data):
    """Reason text must be the generated Module 1 reason for that crop."""
    result = recommend_crops(
        {"district": "Pune", "land_size": 3.5, "season": "Kharif"}, mock_data
    )
    tomato = next(r for r in result if r["crop"] == "Tomato")
    assert "oversupply" in tomato["reason"].lower()


def test_empty_mock_data():
    """No crops should not crash and yields an empty list."""
    assert recommend_crops({"season": "Kharif", "land_size": 3.5}, {"crops": {}}) == []


def test_missing_profit_data_skipped():
    """A crop with missing expected_profit is skipped entirely."""
    data = {
        "crops": {
            "Good": {"expected_profit": 40000, "history": [
                {"season": "Kharif 2024", "avg_price": 100, "planted_area": 10},
                {"season": "Kharif 2025", "avg_price": 120, "planted_area": 11},
            ]},
            "Broken": {"history": [
                {"season": "Kharif 2024", "avg_price": 100, "planted_area": 10},
                {"season": "Kharif 2025", "avg_price": 120, "planted_area": 11},
            ]},
        }
    }
    result = recommend_crops({"season": "Kharif", "land_size": 3.5}, data)
    assert [r["crop"] for r in result] == ["Good"]


def test_land_size_not_in_output(mock_data):
    """land_size is only a filter; it must not appear in the output items."""
    result = recommend_crops(
        {"district": "Pune", "land_size": 3.5, "season": "Kharif"}, mock_data
    )
    for item in result:
        assert "land_size" not in item
