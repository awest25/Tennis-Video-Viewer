#### This file helps to initialize the Firebase Admin SDK. ####
# The credentials must be stored in the credentials folder in the root directory of the project.
# The credentials must be stored in a file named "serviceAccountKey.json".
# Download these credentials from the Firebase Console. Project Settings -> Service Accounts -> Generate new private key.


import firebase_admin
from firebase_admin import credentials, firestore
import os

def initialize_firebase():
    if not firebase_admin._apps:
        # This line gets the current directory of the script (app/functions/firebase_utils.py)
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # This constructs the path to the credentials file (app/credentials/serviceAccountKey.json)
        credentials_path = os.path.join(current_dir, '..', '..', 'credentials', 'serviceAccountKey.json')

        cred = credentials.Certificate(credentials_path)
        firebase_admin.initialize_app(cred)
    return firestore.client()

