import os
from dotenv import load_dotenv
from pydantic import GetCoreSchemaHandler, BaseModel, Field, EmailStr, ConfigDict
from pydantic_core import CoreSchema
from pydantic.json_schema import JsonSchemaValue
from bson import ObjectId
from pymongo import MongoClient
from typing import Optional, List

load_dotenv()
MONGO_URI = "mongodb+srv://231501104:zFO6bsXbCQGDhyfA@nexathon.n4nqp.mongodb.net/?retryWrites=true&w=majority&appName=Nexathon"
client = MongoClient(os.getenv("MONGO_URI"))
db = client["tutoring_platform"]
users_collection = db["users"]
sessions_collection = db["sessions"]

from pydantic import BaseModel, Field, GetCoreSchemaHandler
from bson import ObjectId
from typing import Any
from pydantic_core import core_schema

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source: Any, handler: GetCoreSchemaHandler) -> core_schema.CoreSchema:
        return core_schema.with_info_after_validator_function(
            cls.validate, 
            core_schema.str_schema()
        )

    @classmethod
    def validate(cls, value: Any, info: core_schema.ValidationInfo) -> ObjectId:
        if not ObjectId.is_valid(value):
            raise ValueError(f"Invalid ObjectId: {value}")
        return ObjectId(value)

    @classmethod
    def __get_pydantic_json_schema__(cls, schema: core_schema.CoreSchema, handler: GetCoreSchemaHandler) -> dict:
        json_schema = handler(schema)
        json_schema.update(type="string", format="objectid")
        return json_schema



class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    full_name: str
    email: EmailStr
    password_hash: str
    bio: Optional[str] = None
    specialization: Optional[str] = None
    is_tutor: bool = False
    rating: float = Field(ge=0.0, le=5.0, default=0.0)
    sessions_taught: List[str] = Field(default_factory=list)
    sessions_attended: List[str] = Field(default_factory=list)

    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})


class Session(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    tutor_id: PyObjectId
    student_id: PyObjectId
    subject: str
    duration_minutes: int
    credits: int
    rating_given: Optional[float] = Field(ge=0.0, le=5.0, default=None)

    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})


def create_user(user_data: dict) -> str:
    try:
        user = User(**user_data)
        result = users_collection.insert_one(user.model_dump(by_alias=True))
        return str(result.inserted_id)
    except Exception as e:
        raise RuntimeError(f"Failed to create user: {e}")


def create_session(session_data: dict) -> str:
    try:
        session = Session(**session_data)
        result = sessions_collection.insert_one(session.model_dump(by_alias=True))
        return str(result.inserted_id)
    except Exception as e:
        raise RuntimeError(f"Failed to create session: {e}")


def get_user_by_email(email: str) -> Optional[User]:
    user = users_collection.find_one({"email": email})
    if user:
        user["_id"] = PyObjectId(user["_id"])
        return User(**user)
    return None


def get_user_by_id(user_id: str) -> Optional[User]:
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = PyObjectId(user["_id"])
            return User(**user)
    except Exception as e:
        raise RuntimeError(f"Failed to fetch user: {e}")
    return None


def get_session_by_id(session_id: str) -> Optional[Session]:
    try:
        session = sessions_collection.find_one({"_id": ObjectId(session_id)})
        if session:
            session["_id"] = PyObjectId(session["_id"])
            return Session(**session)
    except Exception as e:
        raise RuntimeError(f"Failed to fetch session: {e}")
    return None
