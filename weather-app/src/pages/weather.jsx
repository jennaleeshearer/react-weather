import React, { useEffect, useState } from "react";
import WeatherNavbar from "../navbar";
import getWeather from "../getWeather";
import setWeatherImg from "../setWeatherImg";
import { getLoggedInUser } from "../users";

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
            <div className="px-5 mx-5">
              <div className="row w-100">
                <div className="col-6 ps-5">
                  <div className="d-flex pb-4">
                    <i className="bi bi-geo-alt me-2"></i>
                    {regionName || "Location Name"}
                  </div>
                  <h1 className="mt-3">{data.current.temperature_2m}°C</h1>
                </div>
                <div className="col-6 d-flex flex-column justify-conent-center align-items-center">
                  {weatherImg && <img src={weatherImg} alt="Weather" width={"130px"} className="mt-4"/>}
                </div>
              </div>
              <div className="d-flex mt-5">
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
            <p>Loading weather details for {regionName || "your location"}...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
