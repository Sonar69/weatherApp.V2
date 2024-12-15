import React from 'react';
import "../css/WeatherDisplay.css";


const WeatherDisplay = ({weather, citySelected}) => {
    // if (weather) {
    //     console.log("weather_code : " + weather.current.weather_code);
    // }
    return (
        <div className="container-weather-display">
            {weather && (
                <div className="weather-display">
                    <div className="gif-display">
                        <img src="/gif/plans.gif" alt="gif-plan"/>
                        <span>{citySelected.name}</span>
                    </div>
                    <div className="gif-display">
                        <img src="/gif/temperature.gif" alt="gif-plan"/>
                        <span>{weather.current.apparent_temperature}°C</span>
                    </div>
                    <div className="gif-display">
                        <img src="/gif/vent.gif" alt="gif-plan"/>
                        <span>{weather.current.wind_speed_10m} km/h</span>
                    </div>
                    <div className="gif-display">
                        <img src="/gif/humidite.gif" alt="gif-plan"/>
                        <span>{weather.current.relative_humidity_2m}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
