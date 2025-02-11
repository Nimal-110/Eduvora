from pymongo import MongoClient

# MongoDB Connection String (Replace with your actual URI)
MONGO_URI = "mongodb+srv://231501104:zFO6bsXbCQGDhyfA@nexathon.n4nqp.mongodb.net/?retryWrites=true&w=majority&appName=Nexathon"
client = MongoClient(MONGO_URI)
db = client["tutoring_platform"]  # Database name
users_collection = db["users"]  # Users collection
tutors_collection = db["tutors"]  # Tutors collection
