import Form from "react-bootstrap/Form"
import WeatherNavbar from "./navbar"
import getWeather from "./getWeather"
import React, { useEffect, useState } from "react"
import setCoordinates from "./setCoordinates"
import { getUsers } from "./users";

function Weather() {
  const API_URL = 'http://localhost:3000/api/v1/weathers'; // Rails API link

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]); // State to store users data

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
    }
  };

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

      <div id="displayUsers">
        <h2>Users List</h2>
        {users && users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} {user.surname} - {user.email} - {user.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
}

export default Weather;
