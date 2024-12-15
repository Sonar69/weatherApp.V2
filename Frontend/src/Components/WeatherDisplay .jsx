import React from 'react';
import "../css/WeatherDisplay.css";


const WeatherDisplay = ({weather, citySelected}) => {
    if (weather) {
        console.log("weather_code : " + weather.current.weather_code);
    }
    return (
        <div className="container-weather-display">
            {weather && (
                <div className="weather-display">
                    <p><img src="/gif/plans.gif" alt="gif-plan"/> {citySelected.name}</p>
                    <p>Température actuelle : {weather.current.apparent_temperature}°C</p>
                    <p>Vitesse du vent : {weather.current.wind_speed_10m} km/h</p>
                    <p>Humidité : {weather.current.relative_humidity_2m}%</p>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
