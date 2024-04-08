import React, { useState } from 'react'
import './WeatherApp.css'

import clear_icon from "../Assets/clear_icon.jpg";
import cloud_icon from "../Assets/cloud_icon.jpg";
import drizzle_icon from "../Assets/drizzle_icon.jpg";
import rain_icon from "../Assets/rain_icon.jpg";
import snow_icon from "../Assets/snow_icon.jpg";

import humidity from "../Assets/humidity.png";
import Max from "../Assets/Max.png";
import min from "../Assets/min.png";
import wind from "../Assets/wind.png";
import serach from "../Assets/search.png";



export default function WeatherApp() {

  let api_key = "0f5840cc409ef1a843c5a61ca0c8474e";

  const [wicon, setWicon] = useState(cloud_icon);


  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;

    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const max = document.getElementsByClassName("max-percent");
    const min = document.getElementsByClassName("min-percent");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = data.wind.speed + " km/h";
    max[0].innerHTML = Math.floor(data.main.temp_max) + "°C";
    min[0].innerHTML = Math.floor(data.main.temp_min) + "°C";
    temprature[0].innerHTML = Math.floor(data.main.temp) + " °C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    }
    else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloud_icon);
    }
    else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(rain_icon);
    }
    else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon);
    }
    else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    }
    else {
      setWicon(clear_icon);
    }

  }
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={serach} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt='background' />


      </div>
      <div className="weather-temp">
        36°C
      </div>

      <div className="weather-location">
        Pune
      </div>

      <div className="data-container">

        <div className="element">
          <img src={humidity} className='icon' alt="" />
          <div className="data">
            <div className="humidity-percent">
              11%
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind} className='icon' alt="" />
          <div className="data">
            <div className="wind-rate">
              2.06 km/h
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>

        <div className="element">
          <img src={Max} className='icon' alt="" />
          <div className="data">
            <div className="max-percent">
              36°C
            </div>
            <div className="text">Max</div>
          </div>
        </div>
        <div className="element">
          <img src={min} className='icon' alt="" />
          <div className="data">
            <div className="min-percent">
              36°C
            </div>
            <div className="text">Min</div>
          </div>
        </div>
      </div>
    </div>
  )
}
