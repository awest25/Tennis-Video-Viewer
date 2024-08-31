#### This file is the main entry point for the Cloud Function. ####

from firebase_admin import initialize_app, firestore
from firebase_functions import firestore_fn
from firebase_utils import initialize_firebase
import sys
import os

# Add the 'app' directory to the Python path
path_to_add = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.insert(0, path_to_add)
# Initialize Firebase Admin SDK
db = initialize_firebase()

# This line listens for a document to be created in the Firestore collection "Test"
@firestore_fn.on_document_created(document="Test/{documentId}")
# This function is called when a document is created in the Firestore collection "Test"
def process_shots(event: firestore_fn.Event[firestore_fn.DocumentSnapshot | None]) -> None:

    if event.data is None:
        return
    data = event.data.to_dict()

    # Over here, we would call our Python script for the jupyter notebook
    from app.scripts.points_calculator import points_calculator
    processed_data = points_calculator(data)

    # Over here, we would update the Firestore document with the processed data
    try:
        event.data.reference.update(processed_data)
    except firestore.exceptions.FirestoreException as e:
        print(f'Error updating Firestore document: {e}')
        return
