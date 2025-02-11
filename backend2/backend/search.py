from builtins import bool, list, str
from fastapi import APIRouter, Query
from typing import Optional
from pymongo import MongoClient
from bson import ObjectId

# MongoDB setup
client = MongoClient("mongodb+srv://231501104:zFO6bsXbCQGDhyfA@nexathon.n4nqp.mongodb.net/?retryWrites=true&w=majority&appName=Nexathon")
db = client["tutoring_platform"]
users_collection = db["users"]

# FastAPI Router
router = APIRouter()

@router.get("/search")
async def search_users(
    subject: Optional[str] = None, 
    is_tutor: Optional[bool] = None, 
    full_name: Optional[str] = None, 
    bio: Optional[str] = None
):
    # Building the query dynamically based on input parameters
    query = {}

    # Subject-based search (case-insensitive)
    if subject:
        query["specialization"] = {"$regex": subject, "$options": "i"}

    # Is tutor filter (only search tutors)
    if is_tutor is not None:
        query["is_tutor"] = is_tutor

    # Full name search (case-insensitive)
    if full_name:
        query["full_name"] = {"$regex": full_name, "$options": "i"}

    # Bio search (case-insensitive)
    if bio:
        query["bio"] = {"$regex": bio, "$options": "i"}

    # Querying the database
    tutors = list(users_collection.find(query, {"_id": 0}))  # Exclude _id field

    return {"users": tutors}
