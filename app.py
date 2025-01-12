from flask import Flask, redirect, request, session, jsonify, render_template
import requests
import os
import time
from dotenv import load_dotenv
from database import save_user, get_user

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Replace with a secure key



# Spotify API credentials
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

# @app.route("/")
# def login():
#     """
#     Redirect the user to Spotify's authorization page.
#     """
#     scope = "streaming user-read-playback-state user-modify-playback-state playlist-read-private"
#     auth_url = f"https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope={scope}"
#     return redirect(auth_url)

@app.route("/")
def login():
    """
    Redirect the user to Spotify's authorization page with forced login.
    """
    print("DEBUG: Login route hit. Redirecting to Spotify auth.")
    scope = "streaming user-read-playback-state user-modify-playback-state playlist-read-private"
    auth_url = (
        f"https://accounts.spotify.com/authorize"
        f"?client_id={CLIENT_ID}"
        f"&response_type=code"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope={scope}"
        f"&show_dialog=true"
    )
    return redirect(auth_url)



# @app.route("/callback")
# def callback():
#     """
#     Handle the callback from Spotify after user authorization.
#     """
#     code = request.args.get("code")
#     if not code:
#         error = request.args.get("error", "Unknown error")
#         return f"<h1>Error during authorization:</h1><p>{error}</p>", 400

#     # Exchange authorization code for tokens
#     token_data = {
#         "grant_type": "authorization_code",
#         "code": code,
#         "redirect_uri": REDIRECT_URI,
#         "client_id": CLIENT_ID,
#         "client_secret": CLIENT_SECRET,
#     }
#     token_response = requests.post("https://accounts.spotify.com/api/token", data=token_data)
#     tokens = token_response.json()

#     if "access_token" not in tokens:
#         return jsonify({"error": "Failed to fetch access token", "details": tokens}), 400

#     # Fetch the user's Spotify profile
#     headers = {"Authorization": f"Bearer {tokens['access_token']}"}
#     profile_response = requests.get("https://api.spotify.com/v1/me", headers=headers)
#     if profile_response.status_code != 200:
#         return jsonify({"error": "Failed to fetch user profile"}), 400

#     user_profile = profile_response.json()
#     user_id = user_profile["id"]

#     # Calculate token expiry time
#     expires_at = int(time.time()) + tokens["expires_in"]

#     # Save tokens and user info in the database
#     save_user(user_id, tokens["access_token"], tokens["refresh_token"], expires_at)

#     # Save user ID in session
#     session["user_id"] = user_id

#     # Redirect to playlists page
#     return redirect("/playlists")

@app.route("/callback")
def callback():
    """
    Handle the callback from Spotify after user authorization.
    """
    code = request.args.get("code")
    if not code:
        error = request.args.get("error", "Unknown error")
        print(f"DEBUG: Authorization failed with error: {error}")
        return f"<h1>Error during authorization:</h1><p>{error}</p>", 400

    # Exchange authorization code for tokens
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
        print(f"DEBUG: Failed to fetch access token: {tokens}")
        return jsonify({"error": "Failed to fetch access token", "details": tokens}), 400

    # Fetch the user's Spotify profile
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    profile_response = requests.get("https://api.spotify.com/v1/me", headers=headers)
    if profile_response.status_code != 200:
        print(f"DEBUG: Failed to fetch user profile: {profile_response.json()}")
        return jsonify({"error": "Failed to fetch user profile"}), 400

    user_profile = profile_response.json()
    user_id = user_profile["id"]

    # Calculate token expiry time
    expires_at = int(time.time()) + tokens["expires_in"]

    # Save tokens and user info in the database
    save_user(user_id, tokens["access_token"], tokens["refresh_token"], expires_at)

    # Save user ID in session
    session["user_id"] = user_id
    print(f"DEBUG: User logged in with user_id: {user_id}")

    # Redirect to playlists page
    print("DEBUG: Redirecting to /playlists")
    return redirect("/playlists")



def refresh_access_token(user_id):
    """
    Refresh the Spotify access token if it has expired.
    """
    user = get_user(user_id)
    if not user:
        return None

    access_token, refresh_token, expires_at = user

    # If the token is still valid, return it
    if int(time.time()) < expires_at:
        return access_token

    # Refresh the token
    refresh_data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
    response = requests.post("https://accounts.spotify.com/api/token", data=refresh_data)
    tokens = response.json()

    if "access_token" not in tokens:
        return None

    # Save the new access token and expiration time
    expires_at = int(time.time()) + tokens.get("expires_in", 3600)
    save_user(user_id, tokens["access_token"], refresh_token, expires_at)

    return tokens["access_token"]

# @app.route("/playlists")
# def playlists():
#     """
#     Fetch and display the user's playlists with playback controls.
#     """
#     user_id = session.get("user_id")
#     if not user_id:
#         return redirect("/")

#     # Refresh the token if needed
#     access_token = refresh_access_token(user_id)
#     if not access_token:
#         return redirect("/")

#     headers = {"Authorization": f"Bearer {access_token}"}
#     response = requests.get("https://api.spotify.com/v1/me/playlists", headers=headers)
#     if response.status_code != 200:
#         return f"<h1>Error fetching playlists:</h1><p>{response.json()}</p>", response.status_code

#     playlists = response.json().get("items", [])
#     return render_template("playlists.html", playlists=playlists)

@app.route("/playlists")
def playlists():
    """
    Fetch and display the user's playlists with playback controls.
    """
    user_id = session.get("user_id")
    if not user_id:
        print("DEBUG: User not logged in. Redirecting to /")
        return redirect("/")

    # Refresh the token if needed
    access_token = refresh_access_token(user_id)
    if not access_token:
        print("DEBUG: Failed to refresh access token. Redirecting to /")
        return redirect("/")

    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get("https://api.spotify.com/v1/me/playlists", headers=headers)
    if response.status_code != 200:
        print(f"DEBUG: Error fetching playlists: {response.json()}")
        return f"<h1>Error fetching playlists:</h1><p>{response.json()}</p>", response.status_code

    playlists = response.json().get("items", [])
    print(f"DEBUG: Successfully fetched {len(playlists)} playlists")
    return render_template("playlists.html", playlists=playlists)




@app.route("/token")
def get_token():
    """
    Serve the access token to the front-end.
    """
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "User not authenticated"}), 401

    access_token = refresh_access_token(user_id)
    if not access_token:
        return jsonify({"error": "Failed to refresh access token"}), 401

    return jsonify({"access_token": access_token})

@app.route("/logout")
def logout():
    """
    Clear the session and log the user out.
    """
    session.clear()  # Clear the session
    print("Session cleared!")
    
    # Redirect to Spotify's logout endpoint to clear their session too
    spotify_logout_url = "https://accounts.spotify.com/logout"
    return redirect(spotify_logout_url)



  






if __name__ == "__main__":
    app.run(debug=True)
