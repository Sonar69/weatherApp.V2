import React from 'react';
import WeatherSearch from "./WeatherSearch .jsx";
import "../css/WeatherApp.css"

const WeatherApp = () => {

    return (
        <div className="body-app">
            <h1 className="title-app">Application Météo</h1>
            <WeatherSearch/>
        </div>
    );
};

export default WeatherApp;
