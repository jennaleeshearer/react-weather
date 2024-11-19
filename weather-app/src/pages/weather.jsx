import Form from "react-bootstrap/Form";
import Badge from 'react-bootstrap/Badge';
import WeatherNavbar from "../navbar";
import getWeather from "../getWeather";
import React, { useEffect, useState } from "react";
import setCoordinates from "../setCoordinates";
import { getUsers } from "../users";

function Weather() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]); // State to store users data
  const [regionName, setRegionName] = useState(""); // State to store selected region name

  // Fetch weather data whenever latitude or longitude changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (latitude && longitude) {
        const weatherData = await getWeather(latitude, longitude);
        setData(weatherData);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  // Fetch all users when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(); // Get users data
      console.log("Users data:", usersData); // Log the users data to inspect
      setUsers(usersData); // Set the users data in state
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once after the component mounts

  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (value !== "placeholder") {
      const { latitude, longitude } = setCoordinates(value);
      setLatitude(latitude);
      setLongitude(longitude);

      // Set the region name based on selected value
      switch (value) {
        case "52.377956, 4.897070":
          setRegionName("Amsterdam, Netherlands");
          break;
        case "51.509865, -0.118092":
          setRegionName("London, United Kingdom");
          break;
        case "-33.918861, 18.423300":
          setRegionName("Cape Town, South Africa");
          break;
        case "48.210033, 16.363449":
          setRegionName("Vienna, Austria");
          break;
        case "48.864716, 2.349014":
          setRegionName("Paris, France");
          break;
        default:
          setRegionName(""); // Clear the name if no valid region is selected
      }
    }
  };

  return (
    <div className="Weather text-light">
      <WeatherNavbar />

      <div className="container py-5 d-flex flex-column text-center align-items-center justify-content-center h-100">
        <h1 className="mt-5">Current Weather</h1>
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

        <div id="displayWeather" className="w-75 mt-5 px-5">
          {data && data.current ? (
            <div>
              <div className="row">
                <div className="col-6">
                  <div className="d-flex">
                    <i className="bi bi-geo-alt me-2"></i>
                    {regionName || "Location Name"}
                  </div>
                  <h1>{data.current.temperature_2m}°C</h1>
                </div>
                <div className="col-6">
                  Description
                </div>
              </div>
              <div className="badge rounded-pill bg-primary me-3">
                <i class="bi bi-wind me-2"></i>
                {data.current.wind_speed_10m} m/s
              </div>
              <div className="badge rounded-pill bg-primary me-3">
                <i class="bi bi-cloud-drizzle me-2"></i>
                {data.current.rain} mm
              </div>
              <div className="badge rounded-pill bg-primary me-3">
                <i class="bi bi-snow me-2"></i>
                {data.daily.snowfall_sum[0]} %
              </div>
            </div>
          ) : (
            <p>Select a region to see the weather details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
