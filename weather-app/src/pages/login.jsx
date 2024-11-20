import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/logo.png'

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

      const json = await response.json()
      localStorage.setItem('authToken', json.user_id); // Save the token in localStorage
      navigate('/weather'); // Redirect to weather page
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/weather'); // Redirect if already logged in
    }
  }, []);

  return (
    <div className="container w-100 h-100">
      <Navbar expand="lg" className="navbar navbar-dark" style={{backgroundColor: "#2f3c4f" }}>
        <Container>
          <Navbar.Brand href="/weather" className="d-flex align-items-center">
            <img
              src={logo}
              height="30"
              className="d-inline-block align-top"
              alt="React Weather App"
            />
            <span className="ms-2 h3 mb-0">React Weather App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/signup">
              <i className="bi bi-person-circle me-1"></i>
                Create Account
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
              <button type="submit" className="btn btn-primary my-3">Login</button>
              <div>
                <a href="/signup" className="text-black text-decoration-none">Create Account</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
