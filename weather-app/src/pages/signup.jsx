import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

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
