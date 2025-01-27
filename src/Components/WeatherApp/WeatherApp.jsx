import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

import clear_icon from "../Assets/clear_icon.jpg";
import cloud_icon from "../Assets/cloud_icon.jpg";
import drizzle_icon from "../Assets/drizzle_icon.jpg";
import rain_icon from "../Assets/rain_icon.jpg";
import snow_icon from "../Assets/snow_icon.jpg";

import humidityImg from "../Assets/humidity.png";
import maxImg from "../Assets/Max.png";
import minImg from "../Assets/min.png";
import windImg from "../Assets/wind.png";
import searchIcon from "../Assets/search.png";

export default function WeatherApp() {
  const api_key = "0f5840cc409ef1a843c5a61ca0c8474e";

  const [weatherData, setWeatherData] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    wind_speed: 0,
    location: "Loading...",
  });
  const [wicon, setWicon] = useState(cloud_icon);
  const [city, setCity] = useState("Pune");

  const fetchWeather = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        temp: Math.floor(data.main.temp),
        temp_max: Math.floor(data.main.temp_max),
        temp_min: Math.floor(data.main.temp_min),
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        location: data.name,
      });

      const weatherIcon = data.weather[0].icon;
      updateWeatherIcon(weatherIcon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch data. Please check the city name.");
    }
  };

  const updateWeatherIcon = (icon) => {
    if (icon === "01d" || icon === "01n") setWicon(clear_icon);
    else if (["02d", "02n"].includes(icon)) setWicon(cloud_icon);
    else if (["03d", "03n", "04d", "04n"].includes(icon)) setWicon(drizzle_icon);
    else if (["09d", "09n", "10d", "10n"].includes(icon)) setWicon(rain_icon);
    else if (["13d", "13n"].includes(icon)) setWicon(snow_icon);
    else setWicon(clear_icon);
  };

  const handleSearch = () => {
    if (city.trim() === "") return;
    fetchWeather(city);
  };

  useEffect(() => {
    fetchWeather("Pune");
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-icon" onClick={handleSearch}>
          <img src={searchIcon} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="background" />
      </div>
      <div className="weather-temp">{weatherData.temp}°C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityImg} className="icon" alt="humidity" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windImg} className="icon" alt="wind" />
          <div className="data">
            <div className="wind-rate">{weatherData.wind_speed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
        <div className="element">
          <img src={maxImg} className="icon" alt="max" />
          <div className="data">
            <div className="max-percent">{weatherData.temp_max}°C</div>
            <div className="text">Max</div>
          </div>
        </div>
        <div className="element">
          <img src={minImg} className="icon" alt="min" />
          <div className="data">
            <div className="min-percent">{weatherData.temp_min}°C</div>
            <div className="text">Min</div>
          </div>
        </div>
      </div>
    </div>
  );
}
