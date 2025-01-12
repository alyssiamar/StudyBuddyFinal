import sqlite3

def create_db():
    conn = sqlite3.connect("spotify_users.db")
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        access_token TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        expires_at INTEGER NOT NULL
    )
    """)
    conn.commit()
    conn.close()

def save_user(id, access_token, refresh_token, expires_at):
    conn = sqlite3.connect("spotify_users.db")
    cursor = conn.cursor()
    cursor.execute("""
    INSERT OR REPLACE INTO users (id, access_token, refresh_token, expires_at)
    VALUES (?, ?, ?, ?)
    """, (id, access_token, refresh_token, expires_at))
    conn.commit()
    conn.close()

def get_user(id):
    conn = sqlite3.connect("spotify_users.db")
    cursor = conn.cursor()
    cursor.execute("""
    SELECT access_token, refresh_token, expires_at FROM users WHERE id = ?
    """, (id,))
    user = cursor.fetchone()
    conn.close()
    return user
