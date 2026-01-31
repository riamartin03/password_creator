from pydantic import BaseModel
from typing import Optional

class PasswordRequest(BaseModel):
    base_word: Optional[str] = None
    length: int
    uppercase: bool
    lowercase: bool
    numbers: bool
    symbols: bool
