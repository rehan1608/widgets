import React, { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      const apiKey = 'ea1686d45d6948a1beb55206230207';
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          error => {
            console.log('Error getting location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <h3>{weather.location.name}</h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}
