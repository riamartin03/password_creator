import random
import string


def generate_random_password(
    length: int,
    uppercase: bool,
    lowercase: bool,
    numbers: bool,
    symbols: bool,
):
    """Generate a completely random password without a base word"""
    
    if length < 12:
        length = 12
    
    char_pool = ""
    transformations = []
    
    symbol_set = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"
    
    if lowercase:
        char_pool += string.ascii_lowercase
    if uppercase:
        char_pool += string.ascii_uppercase
    if numbers:
        char_pool += string.digits
    if symbols:
        char_pool += symbol_set
    
    if not char_pool:
        raise ValueError("At least one character type must be selected")
    
    password_chars = []
    
    if uppercase:
        char = random.choice(string.ascii_uppercase)
        password_chars.append(char)
        transformations.append({"type": "random_uppercase", "new": char})
    
    if lowercase:
        char = random.choice(string.ascii_lowercase)
        password_chars.append(char)
        transformations.append({"type": "random_lowercase", "new": char})
    
    if numbers:
        char = random.choice(string.digits)
        password_chars.append(char)
        transformations.append({"type": "random_number", "new": char})
    
    if symbols:
        char = random.choice("!@#$%^&*()_+-=")
        password_chars.append(char)
        transformations.append({"type": "random_symbol", "new": char})
    
    remaining_length = length - len(password_chars)
    for _ in range(remaining_length):
        char = random.choice(char_pool)
        password_chars.append(char)
        transformations.append({"type": "random_char", "new": char})
    
    random.shuffle(password_chars)
    password = ''.join(password_chars)
    
    transformations.insert(0, {"type": "random_generation", "length": length})
    
    return password, transformations


def generate_password(
    base_word: str,
    length: int,
    uppercase: bool,
    lowercase: bool,
    numbers: bool,
    symbols: bool,
):
    if not base_word or base_word.strip() == "":
        return generate_random_password(length, uppercase, lowercase, numbers, symbols)

    transformations = []
    password_chars = list(base_word.lower())
    
    # Step 1: Capitalize first letter (if uppercase is enabled)
    if uppercase and len(password_chars) > 0 and password_chars[0].isalpha():
        original = password_chars[0]
        password_chars[0] = original.upper()
        transformations.append({
            "type": "position_uppercase",
            "original": original,
            "new": original.upper()
        })

    # ✅ Step 2: Do MULTIPLE substitutions (2 or more, skip first char if capitalized)
    substitutions = {
        "a": "@",
        "s": "$",
        "i": "!",
        "o": "0",
        "e": "3"
    }

    substitution_count = 0
    
    for i, ch in enumerate(password_chars):
        # Skip first character if we capitalized it
        if i == 0 and uppercase:
            continue
            
        lower = ch.lower()
        if symbols and lower in substitutions:
            original_char = password_chars[i]
            password_chars[i] = substitutions[lower]
            transformations.append({
                "type": "substitution",
                "original": original_char,
                "new": substitutions[lower]
            })
            substitution_count += 1
            # ✅ NO BREAK - continues to find all substitutable characters

    # Step 3: Check how much space is left
    current_length = len(password_chars)
    space_remaining = length - current_length
    
    # Step 4: Add number (word length) - but only what fits
    if numbers and space_remaining > 0:
        num = str(len(base_word))
        
        # Only add what fits in the remaining space
        num_to_add = num[:space_remaining]
        
        password_chars.append(num_to_add)
        transformations.append({
            "type": "number_added",
            "new": num_to_add
        })
        
        current_length += len(num_to_add)
        space_remaining -= len(num_to_add)

    # Step 5: Add symbol ONLY if there's still room AND symbols enabled
    if symbols and space_remaining > 0:
        sym = random.choice("!@#$%")
        password_chars.append(sym)
        transformations.append({
            "type": "ending_symbol",
            "new": sym
        })
        current_length += 1
        space_remaining -= 1

    # Step 6: Pad ONLY if still under target length
    if space_remaining > 0:
        for _ in range(space_remaining):
            password_chars.append(random.choice(string.ascii_letters))
        
        transformations.append({
            "type": "length_padding",
            "count": space_remaining
        })

    password = "".join(password_chars)
    
    # Final safety check
    if len(password) > length:
        password = password[:length]

    return password, transformations