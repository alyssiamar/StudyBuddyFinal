import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link } from 'react-router-dom';
import '../styles/StudyMusic.css'; // Optional custom styles

// Component for SpotifyConnect
export function SpotifyMusic() {  // Exporting SpotifyMusic
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract access token or error from the URL
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

export default function StudyMusic() {
  return (
    <div className="study-music-page">
      <h1>Your Study Playlist Hub</h1>
      <div className="playlist-container">
        <Link to="/spotify-connect">
          <button className="spotify-link-button">Connect to Spotify</button>
        </Link>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react'; // Import useState and useEffect
// import { Link } from 'react-router-dom';
// import '../styles/StudyMusic.css'; // Optional custom styles

// // Component for SpotifyConnect
// function SpotifyMusic() {
//   const [playlists, setPlaylists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Extract access token or error from the URL
//     const params = new URLSearchParams(window.location.search);
//     const accessToken = params.get('access_token');
//     const errorParam = params.get('error'); // Avoid naming conflict with state variable

//     if (errorParam) {
//       setError(errorParam);
//       setLoading(false);
//       return;
//     }

//     if (accessToken) {
//       // Fetch playlists with the access token
//       fetch('http://127.0.0.1:5000/playlists', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setPlaylists(data.playlists || []);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error(err);
//           setError('Failed to load playlists');
//           setLoading(false);
//         });
//     }
//   }, []);

//   if (loading) {
//     return <p>Loading playlists...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>Your Playlists:</h2>
//       {playlists.map((playlist) => (
//         <div key={playlist.id}>
//           <h3>{playlist.name}</h3>
//           <img src={playlist.images[0]?.url} alt={playlist.name} width="200" />
//           <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
//             Open on Spotify
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Component for StudyMusic
// export default function StudyMusic() {
//   return (
//     <div className="study-music-page">
//       <h1>Your Study Playlist Hub</h1>
//       <div className="playlist-container">
//         <Link to="/spotify-connect">
//           <button className="spotify-link-button">Connect to Spotify</button>
//         </Link>
//       </div>
//       <SpotifyMusic /> {/* Display SpotifyConnect inside StudyMusic */}
//     </div>
//   );
// }

