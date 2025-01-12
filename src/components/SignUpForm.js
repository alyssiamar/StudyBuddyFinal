import React, { useState } from 'react';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the JSON structure for the POST request
    const requestData = {
      username: username,
      password: password
    };

    try {
      // Make the POST request using fetch
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Tells the server it's JSON data
        },
        body: JSON.stringify(requestData) // Convert the request data into a JSON string
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
      } else {
        const errorData = await response.json();
        console.error('Error during signup:', errorData.message);
      }
    } catch (error) {
      console.error('Network error during signup:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;