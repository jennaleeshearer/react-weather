import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './img/logo.png';

function WeatherNavbar() {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
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
              <Nav.Link href="#">
                <i className="bi bi-geo-alt-fill me-1"></i>
                Saved locations
            </Nav.Link>
              <Nav.Link href="#">
                <i className="bi bi-person-circle me-1"></i>
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default WeatherNavbar;
