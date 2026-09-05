"""Pytest tests for Module 3 - Market Operations."""

import pytest

from ml.market_ops import market_ops, FLAT_RATE_PER_KM


@pytest.fixture
def mock_data():
    return {
        "crops": {
            "Tomato": {
                "mandis": [
                    {"name": "Pune", "distance_km": 42, "price": 2850},
                    {"name": "Nashik", "distance_km": 65, "price": 2780},
                    {"name": "Aurangabad", "distance_km": 120, "price": 2650},
                ],
                "sell_window": "Next 7-10 days",
            }
        }
    }


def test_output_shape(mock_data):
    """Result must match the locked API contract fields."""
    result = market_ops("Tomato", mock_data)
    assert set(result.keys()) == {"mandis", "best_mandi", "sell_window"}
    for mandi in result["mandis"]:
        assert set(mandi.keys()) == {"name", "distance_km", "price", "net_price"}
    assert result["sell_window"] == "Next 7-10 days"


def test_net_price_calculation(mock_data):
    """net_price = price - (distance_km * FLAT_RATE_PER_KM)."""
    mandi = mock_data["crops"]["Tomato"]["mandis"][0]
    result = market_ops("Tomato", mock_data)
    net = mandi["price"] - (mandi["distance_km"] * FLAT_RATE_PER_KM)
    assert result["mandis"][0]["net_price"] == net


def test_sort_descending_by_net_price(mock_data):
    """Mandis must be sorted by net_price descending, best first."""
    result = market_ops("Tomato", mock_data)
    nets = [m["net_price"] for m in result["mandis"]]
    assert nets == sorted(nets, reverse=True)
    assert result["best_mandi"] == result["mandis"][0]["name"]


def test_best_mandi(mock_data):
    """Best mandi has the highest net price."""
    result = market_ops("Tomato", mock_data)
    best = next(m for m in result["mandis"] if m["name"] == result["best_mandi"])
    assert best["net_price"] == max(m["net_price"] for m in result["mandis"])


def test_empty_mandi_list():
    """Empty mandis should not crash; no best mandi is chosen."""
    data = {"crops": {"Onion": {"mandis": [], "sell_window": "Next week"}}}
    result = market_ops("Onion", data)
    assert result["mandis"] == []
    assert result["best_mandi"] is None
    assert result["sell_window"] == "Next week"


def test_crop_not_found():
    """Unknown crop should not crash and yields empty mandis."""
    result = market_ops("DoesNotExist", {"crops": {}})
    assert result["mandis"] == []
    assert result["best_mandi"] is None
    assert result["sell_window"] == "Not available"


def test_missing_distance_defaults_to_zero(mock_data):
    """Missing distance_km defaults to 0, so net_price equals price."""
    data = {
        "crops": {
            "Onion": {"mandis": [{"name": "Pune", "price": 2200}], "sell_window": "X"}
        }
    }
    result = market_ops("Onion", data)
    assert result["mandis"][0]["distance_km"] == 0
    assert result["mandis"][0]["net_price"] == 2200
