// src/components/LoginForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Handle login logic here (e.g., send POST request to login API)

    // Example:
    // const response = await axios.post('/api/login', { email, password });
    // If successful, redirect to dashboard or show token
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      {/* Link to the Sign Up page */}
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default LoginForm;