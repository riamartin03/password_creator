from typing import List, Dict
import re


def explain_password(transformations: List[Dict]) -> List[str]:
    """Generate memorable explanations from transformations during generation"""
    if not isinstance(transformations, list):
        raise ValueError(
            "explain_password expects a list of transformation dictionaries"
        )

    explanations = []
    
    # Check if this is a random password
    is_random = any(t.get("type") == "random_generation" for t in transformations)
    
    if is_random:
        explanations.append("🎲 Randomly Generated Password")
        explanations.append("")
        
        has_upper = any(t.get("type") == "random_uppercase" for t in transformations)
        has_lower = any(t.get("type") == "random_lowercase" for t in transformations)
        has_number = any(t.get("type") == "random_number" for t in transformations)
        has_symbol = any(t.get("type") == "random_symbol" for t in transformations)
        
        explanations.append("Your password includes:")
        if has_upper:
            explanations.append("✓ Uppercase letters for strength")
        if has_lower:
            explanations.append("✓ Lowercase letters for variety")
        if has_number:
            explanations.append("✓ Numbers for complexity")
        if has_symbol:
            explanations.append("✓ Symbols for maximum security")
        
        explanations.append("")
        explanations.append("🔒 This is a high-strength random password")
        explanations.append("💡 Tip: Save it in a password manager for easy access!")
        
        return explanations
    
    # Base word password explanations
    explanations.append("🔐 How Your Password Was Built:")
    explanations.append("")

    for t in transformations:
        if not isinstance(t, dict):
            continue

        t_type = t.get("type")

        if t_type == "position_uppercase":
            original = t.get("original", "")
            new = t.get("new", "")
            explanations.append(
                f"✓ '{original}' → '{new}' - First letter capitalized for strength"
            )

        elif t_type == "substitution":
            original = t.get("original", "")
            new = t.get("new", "")
            explanations.append(
                f"✓ '{original}' → '{new}' - Looks similar, adds security"
            )

        elif t_type == "ending_symbol":
            new = t.get("new", "")
            explanations.append(
                f"✓ Added '{new}' at the end - Clear finish marker"
            )

        elif t_type == "number_added":
            new = t.get("new", "")
            explanations.append(
                f"✓ Number '{new}' added - Represents word length"
            )

        elif t_type == "length_padding":
            count = t.get("count", 1)
            explanations.append(
                f"✓ {count} extra character{'s' if count > 1 else ''} added - Meets security requirements"
            )

    explanations.append("")
    explanations.append("💡 Tip: Read it out loud 3 times to memorize!")

    return explanations


def explain_password_from_password(password: str) -> List[str]:
    """Generate memorable character-by-character breakdown for edited passwords"""
    explanations = []
    
    explanations.append("🔍 Your Password Breakdown:")
    explanations.append("")
    
    # Character-by-character analysis
    char_explanations = []
    
    for i, char in enumerate(password, 1):
        if char == '@':
            char_explanations.append(f"Position {i}: '@' (looks like 'a')")
        elif char == '$':
            char_explanations.append(f"Position {i}: '$' (looks like 's')")
        elif char == '0':
            char_explanations.append(f"Position {i}: '0' (looks like 'o')")
        elif char == '!':
            char_explanations.append(f"Position {i}: '!' (looks like 'i')")
        elif char == '3':
            char_explanations.append(f"Position {i}: '3' (looks like 'e')")
        elif char.isupper():
            char_explanations.append(f"Position {i}: '{char}' - Capital letter")
        elif char.islower():
            char_explanations.append(f"Position {i}: '{char}' - Lowercase letter")
        elif char.isdigit():
            char_explanations.append(f"Position {i}: '{char}' - Number")
        elif not char.isalnum():
            char_explanations.append(f"Position {i}: '{char}' - Special symbol")
    
    # Only show first 8 character details to avoid clutter
    if len(char_explanations) > 8:
        explanations.extend(char_explanations[:8])
        explanations.append(f"... and {len(char_explanations) - 8} more characters")
    else:
        explanations.extend(char_explanations)
    
    explanations.append("")
    
    # Summary insights
    explanations.append("📊 Strength Factors:")
    
    length = len(password)
    explanations.append(f"• Length: {length} characters {'✓' if length >= 12 else '(consider 12+)'}")
    
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_symbol = any(not c.isalnum() for c in password)
    
    if has_upper and has_lower:
        explanations.append("• Mixed case: Yes ✓")
    else:
        explanations.append("• Mixed case: No (add uppercase/lowercase)")
    
    if has_digit:
        explanations.append("• Contains numbers: Yes ✓")
    else:
        explanations.append("• Contains numbers: No (add numbers)")
    
    if has_symbol:
        explanations.append("• Contains symbols: Yes ✓")
    else:
        explanations.append("• Contains symbols: No (add !@#$%)")
    
    explanations.append("")
    explanations.append("💡 Memory Tip: Create a story or pattern with the characters!")

    return explanations