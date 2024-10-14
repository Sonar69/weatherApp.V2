import React from 'react';

const WeatherDisplay = ({ weather, citySelected }) => {
    return (
        <div>
            {weather && (
                <div>
                    <h2>Météo pour {citySelected.name}</h2>
                    <p>Température actuelle : {weather.current.apparent_temperature}°C</p>
                    <p>Vitesse du vent : {weather.current.wind_speed_10m} km/h</p>
                    <p>Humidité : {weather.current.relative_humidity_2m}%</p>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
