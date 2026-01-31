from pydantic import BaseModel

class EvaluatePasswordRequest(BaseModel):
    password: str
