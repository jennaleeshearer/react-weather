import './Weather.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import WeatherNavbar from './navbar';

function Weather() {
  return (
    <div className="Weather">
      <WeatherNavbar />
      <h1 className="mt-5">React Weather App</h1>

      <div className="container">
        <InputGroup className="mb-3">
          <Form.Control id="location-input" placeholder="Enter your Location"/>
        </InputGroup>
      </div>
    </div>
  );
}

export default Weather;
