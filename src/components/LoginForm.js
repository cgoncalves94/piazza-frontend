// Importing necessary dependencies
import React, { useState } from 'react';
import '../styles/styles.css';

// Creating a functional component called LoginForm
const LoginForm = ({ onLogin, errorMessage }) => {
    // Setting up state variables using the useState hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    // Rendering the login form
    return (
        <div className="login-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

// Exporting the LoginForm component as the default export
export default LoginForm;
