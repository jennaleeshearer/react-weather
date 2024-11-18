import "./Weather.css"
import Form from "react-bootstrap/Form"
import WeatherNavbar from "./navbar"
import getWeather from "./getWeather"
import React, { useEffect, useState } from "react"
import setCoordinates from "./setCoordinates"

function Weather() {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [data, setData] = useState(null)

  // Fetch weather data whenever latitude or longitude changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (latitude && longitude) {
        const weatherData = await getWeather(latitude, longitude)
        setData(weatherData)
      }
    }

    fetchWeather()
  }, [latitude, longitude])

  const handleRegionChange = (e) => {
    const value = e.target.value
    if (value !== "placeholder") {
      const { latitude, longitude } = setCoordinates(value)
      setLatitude(latitude)
      setLongitude(longitude)
    }
  }

  return (
    <div className="Weather">
      <WeatherNavbar />
      <h1 className="mt-5">React Weather App</h1>

      <div className="container d-flex flex-column text-center align-items-center">
        <div className="text-center w-50 my-4">
          <Form.Select onChange={handleRegionChange}>
            <option value="placeholder">Select a Region</option>
            <option value="52.377956, 4.897070">Amsterdam</option>
            <option value="51.509865, -0.118092">London</option>
            <option value="-33.918861, 18.423300">Cape Town</option>
            <option value="48.210033, 16.363449">Vienna</option>
            <option value="48.864716, 2.349014">Paris</option>
          </Form.Select>
        </div>
      </div>

      <div id="displayWeather">
        {data && data.current ? (
          <div>
            <h2>Current Weather</h2>
            <p>Temperature: {data.current.temperature_2m}°C</p>
            <p>Wind Speed: {data.current.wind_speed_10m} m/s</p>
          </div>
        ) : (
          <p>Select a region to see the weather details.</p>
        )}
      </div>
    </div>
  )
}

export default Weather
