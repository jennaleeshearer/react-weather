import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      // Handle successful login, e.g., save token or user info
      const data = await response.json();
      console.log(data); // For debugging purposes

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="container w-100 h-100">
      <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 mt-5">
        <div className="card px-5 w-100" style={{ maxWidth: '600px' }}>
          <div className="card-body text-center">
            <h1 className="card-title py-3">Sign In</h1>
            {error && <div className="text-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <div className="text-start">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe" className="ps-2">
                  {' '}
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary my-3">Login</button>
              <div>
                <a href="#" className="text-black text-decoration-none">Forgot Password?</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
