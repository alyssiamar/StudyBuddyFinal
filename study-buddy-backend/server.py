from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# MongoDB connection URI (you can change this to your own MongoDB URI)
app.config["MONGO_URI"] = "mongodb://localhost:27017/studybuddy"

# Initialize the MongoDB connection
mongo = PyMongo(app)

# Route to register a new user
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Check if user already exists
    existing_user = mongo.db.users.find_one({"username": username})
    if existing_user:
        return jsonify({"error": "User already exists!"}), 400

    # Insert new user into the database
    user = {
        "username": username,
        "password": hashed_password,
        "email": email
    }
    mongo.db.users.insert_one(user)

    return jsonify({"message": "User created successfully!"}), 201

# Route to log in a user
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data['username']
    password = data['password']

    # Check if user exists
    user = mongo.db.users.find_one({"username": username})
    if not user:
        return jsonify({"error": "Invalid credentials!"}), 400

    # Check if the passwords match
    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid credentials!"}), 400

if __name__ == '__main__':
    app.run(debug=True)