import './Weather.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import WeatherNavbar from './navbar';
import WeatherDisplay from './displayWeather';
import React, { useState } from 'react';

function Weather() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  return (
    <div className="Weather">
      <WeatherNavbar />
      <h1 className="mt-5">React Weather App</h1>

      <div className="container d-flex">
        <InputGroup className="mb-3 me-3">
          <Form.Control
              id="latitude"
              placeholder="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
              id="longitude"
              placeholder="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
          />
        </InputGroup>


      </div>

      <div id="displayWeather">
        <WeatherDisplay latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}

export default Weather;
