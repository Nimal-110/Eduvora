from builtins import float, int, len, list
from fastapi import APIRouter, HTTPException
from database import tutors_collection
from sklearn.neighbors import NearestNeighbors
import numpy as np

router = APIRouter()


@router.get("/recommend")
def recommend(student_subjects: int, student_experience: int, student_rating: float):
    # Example of a simple recommendation algorithm using placeholders
    tutors_data = [
        # Placeholder data for tutor features (subject, experience, rating)
        [3, 5, 4.5],
        [2, 3, 4.0],
        [1, 4, 5.0],
    ]

    student_preference = np.array([[student_subjects, student_experience, student_rating]])

    model = NearestNeighbors(n_neighbors=2, metric='euclidean')
    model.fit(tutors_data)
    recommended = model.kneighbors(student_preference, return_distance=False)

    # Placeholder tutor data (you should use your actual data structure here)
    tutor_names = ["Tutor A", "Tutor B", "Tutor C"]
    recommended_tutors = [tutor_names[i] for i in recommended[0]]

    return {"recommended_tutors": recommended_tutors}