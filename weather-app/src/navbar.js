import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './img/logo.png';

function WeatherNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on component load
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check for token
    setIsLoggedIn(!!token); // Update state based on token existence
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setIsLoggedIn(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  return (
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
            <Nav.Link href="/more_locations">
              <i className="bi bi-geo-alt-fill me-1"></i>
              More locations
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">
                <i className="bi bi-person-circle me-1"></i>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WeatherNavbar;
