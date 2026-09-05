"""Module 5 - Plant Health Diagnosis.

Uses the Anthropic Claude API to analyze a plant image and return a structured
diagnosis.  This is the ONLY new ML module — all other modules are untouched.

API contract (locked, do not deviate):
    POST /diagnose -> { status, issue_name, recommended_action, confidence_note }
"""

import json
import os
import base64

_ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
_MODEL = "claude-sonnet-4-20250514"


def diagnose_plant_image(
    image_base64: str,
    crop_name: str,
    media_type: str = "image/jpeg",
) -> dict:
    """Send an image to Claude for plant health diagnosis.

    Args:
        image_base64: Base64-encoded image data (no data-URI prefix).
        crop_name: Name of the crop the image belongs to.
        media_type: MIME type of the image (default image/jpeg).

    Returns:
        dict with keys: status, issue_name, recommended_action, confidence_note.
        On any error returns a graceful fallback dict — never raises.
    """
    if not _ANTHROPIC_API_KEY:
        return {
            "status": "error",
            "issue_name": None,
            "recommended_action": (
                "Plant diagnosis is not available right now because the "
                "AI service is not configured. Please try again later."
            ),
            "confidence_note": (
                "The ANTHROPIC_API_KEY environment variable is not set."
            ),
        }

    try:
        import httpx
    except ImportError:
        # Fallback to urllib if httpx is not installed
        import urllib.request
        import urllib.error

        prompt = (
            f"You are an expert agronomist analyzing a photo of a {crop_name} plant. "
            "Examine the image carefully for signs of disease, pest damage, nutrient "
            "deficiency, or confirm it looks healthy.\n\n"
            "Return ONLY a JSON object (no markdown, no code fences, no extra text) "
            "in this exact structure:\n"
            "{\n"
            '  "status": "healthy" or "issue_detected",\n'
            '  "issue_name": "name of the issue" or null,\n'
            '  "recommended_action": "2-3 plain sentences of advice",\n'
            '  "confidence_note": "one honest caveat about this analysis"\n'
            "}"
        )

        payload = json.dumps({
            "model": _MODEL,
            "max_tokens": 1024,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image_base64,
                            },
                        },
                        {
                            "type": "text",
                            "text": prompt,
                        },
                    ],
                }
            ],
        }).encode("utf-8")

        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=payload,
            headers={
                "Content-Type": "application/json",
                "x-api-key": _ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
            },
            method="POST",
        )

        with urllib.request.urlopen(req, timeout=60) as resp:
            body = json.loads(resp.read().decode("utf-8"))

        return _parse_response(body)

    except Exception as exc:
        return {
            "status": "error",
            "issue_name": None,
            "recommended_action": (
                "We could not analyze the image right now. "
                "Please check your connection and try again."
            ),
            "confidence_note": f"Analysis error: {str(exc)[:120]}",
        }


def _call_with_httpx(image_base64: str, crop_name: str, media_type: str) -> dict:
    """Call Anthropic API using httpx."""
    import httpx

    prompt = (
        f"You are an expert agronomist analyzing a photo of a {crop_name} plant. "
        "Examine the image carefully for signs of disease, pest damage, nutrient "
        "deficiency, or confirm it looks healthy.\n\n"
        "Return ONLY a JSON object (no markdown, no code fences, no extra text) "
        "in this exact structure:\n"
        "{\n"
        '  "status": "healthy" or "issue_detected",\n'
        '  "issue_name": "name of the issue" or null,\n'
        '  "recommended_action": "2-3 plain sentences of advice",\n'
        '  "confidence_note": "one honest caveat about this analysis"\n'
        "}"
    )

    response = httpx.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "Content-Type": "application/json",
            "x-api-key": _ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
        },
        json={
            "model": _MODEL,
            "max_tokens": 1024,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image_base64,
                            },
                        },
                        {
                            "type": "text",
                            "text": prompt,
                        },
                    ],
                }
            ],
        },
        timeout=60.0,
    )
    response.raise_for_status()
    return _parse_response(response.json())


def _parse_response(body: dict) -> dict:
    """Extract the JSON diagnosis from the Anthropic API response body."""
    try:
        text = body["content"][0]["text"].strip()
        # Try to extract JSON from the response
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip()
        result = json.loads(text)
        return {
            "status": result.get("status", "healthy"),
            "issue_name": result.get("issue_name"),
            "recommended_action": result.get("recommended_action", ""),
            "confidence_note": result.get("confidence_note", ""),
        }
    except (json.JSONDecodeError, KeyError, IndexError):
        return {
            "status": "error",
            "issue_name": None,
            "recommended_action": (
                "We received an unexpected response from the AI service. "
                "Please try again."
            ),
            "confidence_note": "Could not parse the AI response.",
        }
