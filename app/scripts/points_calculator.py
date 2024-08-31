#### Test script: This script takes a JSON object as input, utilizes its data, and returns a JSON object as output. ####
# For future reference, if we are to create a script for the jupyter notebook, we need to make it a module that
# can take in the JSON object, parse it, and then return a JSON points object with all the necessary data.

import sys
import json
from app.functions.firebase_utils import initialize_firebase

# Initialize Firestore
db = initialize_firebase()

def points_calculator(data):
    name = data["name"]
    return {"points": "Hello " + name}

if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    result = points_calculator(data)
    print(json.dumps(result))