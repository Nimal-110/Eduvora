from builtins import bool, float, str,int
from pydantic import BaseModel
from typing import List, Optional

class Tutor(BaseModel):
    full_name: str
    email: str
    subjects: List[str]
    location: Optional[str] = None
    experience: Optional[int] = 0
    rating: Optional[float] = 0.0
    availability: List[str]
    is_tutor: bool
