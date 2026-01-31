import re

LEET_MAP = {
    'a': '@',
    's': '$',
    'o': '0',
    'i': '!',
    'e': '3'
}

def calculate_strength(password: str):
    score = 0
    reasons = []

    length = len(password)
    unique_chars = len(set(password))

    # Length scoring
    if length >= 8:
        score += 20
        reasons.append("Good length (8+ characters).")
    if length >= 12:
        score += 20
        reasons.append("Strong length (12+ characters).")

    # Character categories
    if re.search(r"[A-Z]", password):
        score += 15
        reasons.append("Contains uppercase letters.")
    if re.search(r"[a-z]", password):
        score += 15
        reasons.append("Contains lowercase letters.")
    if re.search(r"[0-9]", password):
        score += 15
        reasons.append("Contains numbers.")
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 15
        reasons.append("Contains special symbols.")

    # 🔥 NEW: Character diversity bonus
    if unique_chars / length > 0.7:
        score += 10
        reasons.append("High character variety improves unpredictability.")

    # 🔥 NEW: Leetspeak / substitution bonus
    substitution_count = sum(1 for c in password if c in LEET_MAP.values())
    if substitution_count >= 2:
        score += 10
        reasons.append("Multiple symbol substitutions make the password harder to guess.")

    # Cap score
    score = min(score, 100)

    # Strength level
    if score >= 80:
        level = "Strong"
    elif score >= 50:
        level = "Medium"
    else:
        level = "Weak"

    return {
        "score": score,
        "level": level,
        "reasons": reasons
    }
