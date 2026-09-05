"""Module 3 - Market Operations Layer.

Given a crop, loops its mandi list and computes a net price after transport
costs (flat rate * distance), then surfaces the best mandi and sell window.

API contract (locked, do not deviate):
    GET /market?crop= -> { mandis: [{ name, distance_km, price, net_price }], best_mandi, sell_window }
"""

# Flat transport cost in rupees per kilometre (the "flat_rate").
FLAT_RATE_PER_KM = 5


def market_ops(crop, mock_data):
    """Compute market operations (mandi comparison) for a crop.

    Args:
        crop: Crop name key in mock_data["crops"].
        mock_data: parsed mock_data.json.

    Returns:
        dict: {
            "mandis": [{ "name", "distance_km", "price", "net_price" }],
            "best_mandi": str | None,
            "sell_window": str,
        }
    """
    crops = mock_data.get("crops", {})
    crop_data = crops.get(crop)

    if crop_data is None:
        return {
            "mandis": [],
            "best_mandi": None,
            "sell_window": "Not available",
        }

    mandis = []
    for mandi in crop_data.get("mandis", []):
        distance_km = mandi.get("distance_km", 0)
        price = mandi.get("price", 0)
        net_price = price - (distance_km * FLAT_RATE_PER_KM)
        mandis.append({
            "name": mandi.get("name"),
            "distance_km": distance_km,
            "price": price,
            "net_price": net_price,
        })

    # Sort by net price descending; best mandi is the first entry.
    mandis.sort(key=lambda m: m["net_price"], reverse=True)

    return {
        "mandis": mandis,
        "best_mandi": mandis[0]["name"] if mandis else None,
        "sell_window": crop_data.get("sell_window", "Not available"),
    }
