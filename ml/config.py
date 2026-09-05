"""Shared configuration for the FasalSetu AI/ML modules.

Thresholds are hand-tuned constants, not learned models. They all live here so
the saturation-risk logic in other modules never hardcodes magic numbers
inline.
"""

# A crop is considered to have a strong upward price signal when its price rose
# by more than this fraction between the two most recent seasons.
HIGH_RISE_THRESHOLD = 0.15

# A crop is considered to have "lagging" planted area when its area grew by at
# most this fraction between the same two seasons.
LOW_RISE_THRESHOLD = 0.05
