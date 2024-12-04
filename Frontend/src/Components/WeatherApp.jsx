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
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${citySearch}&count=100&language=fr&format=json`);
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
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`);
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
