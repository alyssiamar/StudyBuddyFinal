from flask import Flask, redirect, request, session, jsonify, render_template
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Replace with a secure key

# Spotify API credentials
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

@app.route("/")
def login():
    """
    Redirect the user to Spotify's authorization page.
    """
    scope = "streaming user-read-playback-state user-modify-playback-state playlist-read-private"
    auth_url = f"https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope={scope}"
    return redirect(auth_url)

@app.route("/callback")
def callback():
    """
    Handle the callback from Spotify after user authorization.
    """
    code = request.args.get("code")
    if not code:
        error = request.args.get("error", "Unknown error")
        return f"<h1>Error during authorization:</h1><p>{error}</p>", 400

    # Exchange authorization code for an access token
    token_data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
    token_response = requests.post("https://accounts.spotify.com/api/token", data=token_data)
    tokens = token_response.json()

    if "access_token" not in tokens:
        return jsonify({"error": "Failed to fetch access token", "details": tokens}), 400

    # Save the access token in the session
    session["access_token"] = tokens["access_token"]

    # Redirect to playlists page
    return redirect("/playlists")

@app.route("/playlists")
def playlists():
    """
    Fetch and display the user's playlists with playback controls.
    """
    access_token = session.get("access_token")
    if not access_token:
        return redirect("/")

    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get("https://api.spotify.com/v1/me/playlists", headers=headers)
    if response.status_code != 200:
        return f"<h1>Error fetching playlists:</h1><p>{response.json()}</p>", response.status_code

    playlists = response.json().get("items", [])
    return render_template("playlists.html", playlists=playlists)

@app.route("/token")
def get_token():
    """
    Serve the access token to the front-end.
    """
    access_token = session.get("access_token")
    if not access_token:
        return jsonify({"error": "User not authenticated"}), 401
    return jsonify({"access_token": access_token})

if __name__ == "__main__":
    app.run(debug=True)
