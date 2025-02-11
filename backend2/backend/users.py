from builtins import bool, str
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from fastapi.responses import JSONResponse
import bcrypt
import re  # For email validation
from typing import Optional

# MongoDB setup
client = MongoClient("mongodb+srv://231501104:zFO6bsXbCQGDhyfA@nexathon.n4nqp.mongodb.net/?retryWrites=true&w=majority&appName=Nexathon")
db = client["tutoring_platform"]
users_collection = db["users"]

# FastAPI Router for user-related operations
router = APIRouter()

# Email validation function
def is_valid_email(email: str) -> bool:
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(email_regex, email) is not None

# Pydantic models
class User(BaseModel):
    full_name: str
    email: str
    password: str  
    bio: str = None
    specialization: str = None
    is_tutor: bool

class UserLogin(BaseModel):
    email: str
    password: str

class UpdateUser(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    bio: Optional[str] = None
    specialization: Optional[str] = None
    is_tutor: Optional[bool] = None
    password: Optional[str] = None  

# Function to hash passwords
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

# Function to verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# Route to handle user registration (Now includes credit system)
@router.post("/users")
async def create_user(user: User):
    if not is_valid_email(user.email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")

    hashed_password = hash_password(user.password)

    new_user = {
        "full_name": user.full_name,
        "email": user.email,
        "password_hash": hashed_password,
        "bio": user.bio,
        "specialization": user.specialization,
        "is_tutor": user.is_tutor,
        "credits": 50  # Initialize with 50 credits
    }
    
    result = users_collection.insert_one(new_user)
    return JSONResponse(content={"message": "User created successfully", "user_id": str(result.inserted_id), "credits": 50}, status_code=201)

# Route to handle user login
@router.post("/login")
async def login(user: UserLogin):
    if not is_valid_email(user.email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    stored_user = users_collection.find_one({"email": user.email})
    if not stored_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, stored_user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "Login successful", "user_id": str(stored_user["_id"]), "credits": stored_user["credits"]}

# Route to fetch user profile by ID
@router.get("/users/{user_id}")
async def get_user_profile(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])
    user.pop("password_hash", None)
    return user

# Route to update user profile
@router.put("/users/{user_id}")
async def update_user_profile(user_id: str, user: UpdateUser):
    updated_data = {key: value for key, value in user.dict().items() if value is not None}

    if "password" in updated_data:
        updated_data["password_hash"] = hash_password(updated_data["password"])
        del updated_data["password"]

    result = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": updated_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User profile updated successfully"}

# Route to delete a user account
@router.delete("/users/{user_id}")
async def delete_user_account(user_id: str):
    result = users_collection.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User account deleted successfully"}

# Route to check user's credit balance
@router.get("/users/{user_id}/credits")
async def check_credits(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)}, {"credits": 1})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"user_id": user_id, "credits": user["credits"]}
