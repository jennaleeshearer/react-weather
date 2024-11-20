import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/logo.png'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    location: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: formData }), // Send form data as user
      });

      if (response.status === 201) {
        navigate('/weather'); // Redirect on success
      } else {
        const data = await response.json();
        setError(data.errors || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/weather'); // Redirect if already logged in
    }
  }, [navigate]);

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
              <Nav.Link href="/login">
              <i className="bi bi-person-circle me-1"></i>
                login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 mt-5">
        <div className="card px-5 w-100" style={{ maxWidth: '600px' }}>
          <div className="card-body text-center">
            <h1>Sign up</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  name="name"
                  placeholder="Name *"
                  value={formData.name}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  name="surname"
                  placeholder="Surname *"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Region</option>
                  <option value="Amsterdam">Amsterdam</option>
                  <option value="London">London</option>
                  <option value="Cape Town">Cape Town</option>
                  <option value="Vienna">Vienna</option>
                  <option value="Paris">Paris</option>
                  <option value="Sydney">Sydney</option>
                </Form.Select>
              </InputGroup>
              <button type="submit" className="btn btn-primary my-3">Sign Up</button>
              <div>
                <a href="/login" className="text-black text-decoration-none">Already have an account? Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
