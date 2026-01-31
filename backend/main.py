from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models.password_request import PasswordRequest
from logic.generator import generate_password
from logic.strength import calculate_strength
from logic.explanation import explain_password,explain_password_from_password
from models.password_request import PasswordRequest

from typing import Optional

class PasswordRequest(BaseModel):
    base_word: Optional[str] = ""  # ✅ Make it optional with default empty string
    length: int = 12
    uppercase: bool = True
    lowercase: bool = True
    numbers: bool = True
    symbols: bool = True

class EvaluateRequest(BaseModel):
    password: str


app = FastAPI()

# ✅ CORS (React → FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend running"}


# 🔐 Generate password (Level 2)
@app.post("/generate-password")
def generate(request: PasswordRequest):
    try:
        # generator MUST return (password, transformations)
        password, transformations = generate_password(
            base_word=request.base_word,
            length=request.length,
            uppercase=request.uppercase,
            lowercase=request.lowercase,
            numbers=request.numbers,
            symbols=request.symbols,
        )

        strength = calculate_strength(password)
        reasons = explain_password(transformations)

        return {
            "password": password,
            "strength": strength,
            "explanation": reasons

        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# 🔍 Re-evaluate edited password
@app.post("/evaluate-password")
def evaluate(request: EvaluateRequest):
    password = request.password.strip()

    if not password:
        raise HTTPException(status_code=400, detail="Password cannot be empty")

    strength = calculate_strength(password)

    # ✅ Use detailed character-by-character breakdown
    reasons = explain_password_from_password(password)

    return {
        "strength": strength,
        "explanation": reasons
    }