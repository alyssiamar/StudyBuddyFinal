import React, { useState, useEffect } from 'react';

export default function SpotifyConnect() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const errorParam = params.get('error');

    if (errorParam) {
      setError(errorParam);
      setLoading(false);
      return;
    }

    if (accessToken) {
      fetch('http://127.0.0.1:5000/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPlaylists(data.playlists || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load playlists');
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <p>Loading playlists...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Playlists:</h2>
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <img src={playlist.images[0]?.url} alt={playlist.name} width="200" />
          <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            Open on Spotify
          </a>
        </div>
      ))}
    </div>
  );
}
