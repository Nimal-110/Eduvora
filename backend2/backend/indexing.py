import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from builtins import print
from backend.database import tutors_collection


# Add the backend directory to the Python path


# Now you can safely import from backend.utils.database
 # Import should work now

# Your existing code continues here
# ...

def create_text_index():
    tutors_collection.create_index([("subjects", "text"), ("location", "text")])
    print("Index created successfully.")

if __name__ == "__main__":
    create_text_index()
5