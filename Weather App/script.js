"use strict";

const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const appKey = `&appid=1dc02c2cda3d32eda98eede7405d0e42`;

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");

function fetchWeather() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    const cityQuery = `&q=${cityName}`;

    fetch(`${apiURL}${appKey}${cityQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            displayError();
        });
}

function displayWeather(data) {
    document.querySelector(".city-name").textContent = data.name;
    document.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind-speed").textContent = `${data.wind.speed} km/h`;
    document.querySelector(".weather-description").textContent = data.weather[0].description;

    const weatherCondition = data.weather[0].main.toLowerCase();
    setWeatherIcon(weatherCondition);
    
    document.querySelector(".weather-display").style.display = "block";
    errorMessage.style.display = "none";
}

function displayError() {
    errorMessage.style.display = "block";
    document.querySelector(".weather-display").style.display = "none";
}

function setWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "clouds":
            weatherIcon.src = "img/clouds.png";
            break;
        case "mist":
            weatherIcon.src = "img/mist.png";
            break;
        case "rain":
            weatherIcon.src = "img/rain.png";
            break;
        case "drizzle":
            weatherIcon.src = "img/drizzle.png";
            break;
        case "clear":
            weatherIcon.src = "img/clear.png";
            break;
        case "snow":
            weatherIcon.src = "img/snow.png";
            break;
        case "haze":
            weatherIcon.src = "img/haze.png";
            break;
        default:
            weatherIcon.src = "";
    }
}

// Event listeners
searchBtn.addEventListener("click", fetchWeather);

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fetchWeather();
    }
});
