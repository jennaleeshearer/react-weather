import React, { useEffect, useState } from 'react';

const WeatherDisplay = ({ latitude, longitude }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
                );

                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        if (latitude && longitude) {
            fetchWeather();
        }
    }, [latitude, longitude]);

    const { current } = weatherData || {};

    return (
        <div>
            <h1>Weather at Latitude: {latitude}, Longitude: {longitude}</h1>
            {current && (
              <div>
                  <h2>Current Weather</h2>
                  <p>Temperature: {current.temperature_2m}°C</p>
                  <p>Wind Speed: {current.wind_speed_10m} m/s</p>
              </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
