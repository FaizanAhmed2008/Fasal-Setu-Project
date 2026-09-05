"""Module 4 - Rural Advisory Feed.

Returns canned weather/pest alerts for a crop straight from the mock data.

API contract (locked, do not deviate):
    GET /advisory?crop= -> { alerts: [{ type: "weather"|"pest", message }] }
"""


def advisory_feed(crop, mock_data):
    """Return advisory alerts for a crop.

    Args:
        crop: Crop name key in mock_data["crops"].
        mock_data: parsed mock_data.json.

    Returns:
        dict: { "alerts": [{ "type": "weather"|"pest", "message" }] }
    """
    crops = mock_data.get("crops", {})
    crop_data = crops.get(crop)

    if crop_data is None:
        return {"alerts": []}

    return {"alerts": crop_data.get("alerts", [])}
