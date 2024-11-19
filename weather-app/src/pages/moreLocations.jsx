
import Form from "react-bootstrap/Form";
import WeatherNavbar from "../navbar";
import getWeather from "../getWeather";
import React, { useEffect, useState } from "react";
import setCoordinates from "../setCoordinates";
import { getUsers } from "../users";
import setWeatherImg from '../setWeatherImg';

function Weather() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState(null);
  const [regionName, setRegionName] = useState(""); // State to store selected region name
  const [cloudCover, setCloudCover] = useState(null); // State to store cloud cover
  const [snow, setSnow] = useState(null); // State to store snow cover
  const [weatherImg, setWeatherImgSrc] = useState(null); // State to store weather image

  // Fetch weather data whenever latitude or longitude changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (latitude && longitude) {
        const weatherData = await getWeather(latitude, longitude);
        setData(weatherData);

        // Extract cloud cover from weather data and set it
        if (weatherData && weatherData.current) {
          setCloudCover(weatherData.current.cloud_cover); // Set the cloud cover state
          setSnow(weatherData.current.snow || 0); // Set the snow state (default to 0 if undefined)
        }
      }
    };

    fetchWeather();
  }, [latitude, longitude]); // Re-run when latitude or longitude changes

  // Update weather image based on cloud cover
  useEffect(() => {
    if (cloudCover !== null) {
      const imageUrl = setWeatherImg(cloudCover, snow);
      setWeatherImgSrc(imageUrl);
    }
  }, [cloudCover, snow]); // Re-run whenever cloudCover changes

  // Fetch all users when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(); // Get users data
      console.log("Users data:", usersData); // Log the users data to inspect
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
        case "-33.865143, 151.209900":
          setRegionName("Sydney, Australia");
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
        <div className="text-center w-50 my-4">
          <Form.Select onChange={handleRegionChange}>
            <option value="placeholder">Select a Region</option>
            <option value="52.377956, 4.897070">Amsterdam</option>
            <option value="51.509865, -0.118092">London</option>
            <option value="-33.918861, 18.423300">Cape Town</option>
            <option value="48.210033, 16.363449">Vienna</option>
            <option value="48.864716, 2.349014">Paris</option>
            <option value="-33.865143, 151.209900">Sydney</option>
          </Form.Select>
        </div>

        <div id="displayWeather" className="w-75 mt-5 px-5">
          {data && data.current ? (
            <div className="px-5 mx-5">
              <div className="row w-100">
                <div className="col-6 ps-5">
                  <div className="d-flex">
                    <i className="bi bi-geo-alt me-2"></i>
                    {regionName || "Location Name"}
                  </div>
                  <h1 className="mt-3">{data.current.temperature_2m}°C</h1>
                </div>
                <div className="col-6 d-flex flex-column justify-conent-center align-items-center">
                  {weatherImg && <img src={weatherImg} alt="Weather" width={"130px"} />}
                </div>
              </div>
              <div className="d-flex mt-4">
                <div className="badge rounded-pill bg-secondary me-3 d-flex align-items-center justify-content-center flex-grow-1">
                  <i className="bi bi-wind me-2 h5 my-0"></i>
                  <h5 className="m-0">{data.current.wind_speed_10m} m/s</h5>
                </div>

                <div className="badge rounded-pill bg-secondary me-3 d-flex align-items-center justify-content-center flex-grow-1">
                  <i className="bi bi-cloud-drizzle me-2 h5 my-0"></i>
                  <h5 className="m-0">{data.current.rain} mm</h5>
                </div>

                <div className="badge rounded-pill bg-secondary me-3 d-flex align-items-center justify-content-center flex-grow-1">
                  <i className="bi bi-snow me-2 h5 my-0"></i>
                  <h5 className="m-0">{data.daily.snowfall_sum[0]} %</h5>
                </div>
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
