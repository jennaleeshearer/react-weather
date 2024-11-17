import './Weather.css'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import WeatherNavbar from './navbar'
import getWeather from './getWeather'
import React, { useEffect, useState } from 'react'

function Weather() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    getWeather(latitude, longitude).then(resp => setData(resp))
  }, [latitude, longitude])

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
      <div>
        {data?.current != null ? (
          <div>
            <h2>Current Weather</h2>
            <p>Temperature: {data.current.temperature_2m}°C</p>
            <p>Wind Speed: {data.current.wind_speed_10m} m/s</p>
          </div>
        )
        : null
      }
      </div>

      </div>
    </div>
  )
}

export default Weather
