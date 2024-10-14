import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherSearch from "./WeatherSearch .jsx";
import WeatherDisplay from "./WeatherDisplay .jsx";
import Button from "./Button.jsx";

const WeatherApp = () => {
    const [citySearch, setCitySearch] = useState('');
    const [citySelected, setCitySelected] = useState({});
    const [fetchCity, setFetchCity] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weather, setWeather] = useState(null);

    // Fetch cities based on search
    const getCity = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/weather/${citySearch}`);
            setFetchCity(response.data.results ? response.data.results : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des données météorologiques', error);
        }
    };

    // Handle city selection
    const handleSelectCity = (e) => {
        const [name, lat, lon] = e.target.value.split(',');
        const citySelected = {
            value: e.target.value,
            name: name.trim(),
            latitude: lat.trim(),
            longitude: lon.trim(),
        };
        setCitySelected(citySelected);
        setLatitude(citySelected.latitude);
        setLongitude(citySelected.longitude);
    };

    // Fetch weather data for selected city
    const handleWeatherCity = async () => {
        if (!latitude || !longitude) return;

        try {
            const response = await axios.get(`http://localhost:3000/weather/${latitude}/${longitude}`);
            setWeather(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données météorologiques', error);
        }
    };

    useEffect(() => {
        if (citySearch) {
            getCity();
        }
    }, [citySearch]);

    return (
        <div>
            <h1>Application Météo</h1>
            <WeatherSearch
                citySearch={citySearch}
                setCitySearch={setCitySearch}
                fetchCity={fetchCity}
                handleSelectCity={handleSelectCity}
                citySelected={citySelected}
            />
            <Button onClick={handleWeatherCity} disabled={!citySelected.name}>
                Obtenir la météo
            </Button>
            <WeatherDisplay weather={weather} citySelected={citySelected} />
        </div>
    );
};

export default WeatherApp;
