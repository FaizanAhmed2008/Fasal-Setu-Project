"""Pytest tests for Module 4 - Rural Advisory Feed."""

import pytest

from ml.advisory import advisory_feed


@pytest.fixture
def mock_data():
    return {
        "crops": {
            "Tomato": {
                "alerts": [
                    {"type": "weather", "message": "Heavy rainfall expected in the next 48 hours."},
                    {"type": "pest", "message": "Monitor for early blight signs."},
                ]
            }
        }
    }


def test_output_shape(mock_data):
    """Result must match the locked API contract fields."""
    result = advisory_feed("Tomato", mock_data)
    assert set(result.keys()) == {"alerts"}
    for alert in result["alerts"]:
        assert set(alert.keys()) == {"type", "message"}
        assert alert["type"] in ("weather", "pest")
        assert alert["message"]


def test_alerts_pulled_from_mock(mock_data):
    """Alerts should match the mock data verbatim."""
    result = advisory_feed("Tomato", mock_data)
    assert result["alerts"] == mock_data["crops"]["Tomato"]["alerts"]


def test_two_to_three_alerts(mock_data):
    """A well-formed crop should return 2-3 alerts."""
    result = advisory_feed("Tomato", mock_data)
    assert 2 <= len(result["alerts"]) <= 3


def test_crop_not_found():
    """Unknown crop returns an empty alerts list without crashing."""
    result = advisory_feed("Missing", {"crops": {}})
    assert result == {"alerts": []}


def test_missing_alerts_field():
    """A crop without an alerts field returns an empty list."""
    data = {"crops": {"Wheat": {"expected_profit": 100}}}
    result = advisory_feed("Wheat", data)
    assert result == {"alerts": []}
