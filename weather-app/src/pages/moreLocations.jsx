
import Form from "react-bootstrap/Form";
import WeatherNavbar from "../navbar";
import getWeather from "../getWeather";
import React, { useEffect, useState } from "react";
import setCoordinates from "../setCoordinates";
import setWeatherImg from '../setWeatherImg';
import WeatherContent from "../components/WeatherContent";

function Weather() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState(null);
  const [regionName, setRegionName] = useState("");
  const [cloudCover, setCloudCover] = useState(null);
  const [snow, setSnow] = useState(null);
  const [weatherImg, setWeatherImgSrc] = useState(null);

  // Fetch weather data whenever latitude or longitude changes
  useEffect(() => {
    const fetchWeather = async () => {
      if (latitude && longitude) {
        const weatherData = await getWeather(latitude, longitude);
        setData(weatherData);

        if (weatherData && weatherData.current) {
          setCloudCover(weatherData.current.cloud_cover || 0);
          setSnow(weatherData.current.snow || 0);
        }
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  // Update weather image
  useEffect(() => {
    if (cloudCover !== null) {
      const imageUrl = setWeatherImg(cloudCover, snow);
      setWeatherImgSrc(imageUrl);
    }
  }, [cloudCover, snow]);

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
          setRegionName("");
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
            <WeatherContent data={data} regionName={regionName} weatherImg={weatherImg} />
          ) : (
            <p>Select a region to see the weather details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
