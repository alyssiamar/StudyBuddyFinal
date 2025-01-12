import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });

            // If login is successful (status 200)
            if (response.status === 200) {
                // Redirect to the external URL
                window.location.href = "https://playful-pony-ea307f.netlify.app/";
            }
        } catch (err) {
            // If there is an error, display it
            setError(err.response?.data?.error || 'Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                
                {/* Show error if there is any */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <button type="submit">Login</button>
            </form>
            
            {/* Link to the Sign-Up page */}
            <p>
                Don't have an account?{' '}
                <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
};

export default LoginForm;