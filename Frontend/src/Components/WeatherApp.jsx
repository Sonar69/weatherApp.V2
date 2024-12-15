import React from 'react';
import WeatherSearch from "./WeatherSearch .jsx";
import "../css/WeatherApp.css"

const WeatherApp = () => {

    return (
        <div className="body-app">
            <h1 className="title-app">Application Météo</h1>
            <WeatherSearch/>
            <footer className="footer-app">
                © {new Date().getFullYear()} Clément Bonnet. Tous droits réservés.
            </footer>
        </div>
    );
};

export default WeatherApp;
