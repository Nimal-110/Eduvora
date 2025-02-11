from fastapi import FastAPI
from search import router as search_router
from ai_matching import router as ai_router
from users import router as users_router  # Importing the users router

# FastAPI app
app = FastAPI()

# Include routers
app.include_router(search_router, prefix="/api")
app.include_router(ai_router, prefix="/api")
app.include_router(users_router, prefix="/api")  # Include the users API

@app.get("/")
def home():
    return {"message": "Welcome to the Tutoring Platform API"}
