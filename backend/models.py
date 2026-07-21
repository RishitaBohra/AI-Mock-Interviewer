



from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime


class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class InterviewResponse(BaseModel):
    question: str
    answer: str
    evaluation: str


class InterviewHistory(BaseModel):
    role: str
    difficulty: str
    duration: int
    responses: List[InterviewResponse]