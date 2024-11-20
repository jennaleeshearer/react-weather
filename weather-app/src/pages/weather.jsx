import React, { useEffect, useState } from "react";
import WeatherNavbar from "../navbar";
import getWeather from "../getWeather";
import setWeatherImg from "../setWeatherImg";
import { getLoggedInUser } from "../users";
import WeatherContent from "../components/WeatherContent";

// Mapping of city names to coordinates
const cityCoordinates = {
  Amsterdam: { latitude: "52.377956", longitude: "4.897070" },
  London: { latitude: "51.509865", longitude: "-0.118092" },
  "Cape Town": { latitude: "-33.918861", longitude: "18.423300" },
  Vienna: { latitude: "48.210033", longitude: "16.363449" },
  Paris: { latitude: "48.864716", longitude: "2.349014" },
  Sydney: { latitude: "-33.865143", longitude: "151.209900" },
};

function Weather() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [regionName, setRegionName] = useState("");
  const [data, setData] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);
  const [snow, setSnow] = useState(null);
  const [weatherImg, setWeatherImgSrc] = useState(null);

  // Fetch the logged-in user's data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getLoggedInUser(); // Fetch user data from the backend
        if (user && user.location) {
          const city = user.location;
          setRegionName(city);

          // Resolve coordinates using city name
          const coordinates = cityCoordinates[city];
          if (coordinates) {
            setLatitude(coordinates.latitude);
            setLongitude(coordinates.longitude);
          } else {
            console.error("City not found in the mapping.");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  // Fetch weather data when latitude and longitude are set
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
  }, [cloudCover, snow]); // Re-run whenever cloudCover or snow changes

  return (
    <div className="Weather text-light">
      <WeatherNavbar />
      <div className="container py-5 d-flex flex-column text-center align-items-center justify-content-center h-100">
        <div id="displayWeather" className="w-75 mt-5 px-5">
          {data && data.current ? (
            <WeatherContent data={data} regionName={regionName} weatherImg={weatherImg} />
          ) : (
            <p>Loading weather details for {regionName || "your location"}...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
