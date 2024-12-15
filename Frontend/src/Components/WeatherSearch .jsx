import React, {useEffect, useState} from 'react';
import "../css/WeatherSearch.css"
import WeatherDisplay from "./WeatherDisplay .jsx";
import WeatherCode from "./WeatherCode.jsx";
import {fetchCity, fetchWeather} from "../Service/api.js";

const WeatherSearch = () => {
    const [citySearch, setCitySearch] = useState('');
    const [citySelected, setCitySelected] = useState({});
    const [error, setError] = useState(null);
    const [fetchCityResults, setFetchCityResults] = useState([]);
    const [weather, setWeather] = useState(null);
    const [weatherCode, setWeatherCode] = useState("");

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (citySearch) {
                try {
                    const results = await fetchCity(citySearch);
                    setFetchCityResults(results);
                    setError(null);
                } catch (err) {
                    setError(err.message);
                }
            } else {
                setFetchCityResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [citySearch]);

    useEffect(() => {
        if (citySelected.latitude && citySelected.longitude) {
            (async () => {
                try {
                    const weatherData = await fetchWeather(citySelected.latitude, citySelected.longitude);
                    setWeather(weatherData);
                    setWeatherCode(weatherData.current.weather_code);
                    setError(null);
                } catch (err) {
                    setError(err.message);
                }
            })();
        }
    }, [citySelected]);

    const handleSelectCity = (e) => {
        const [name, latitude, longitude] = e.target.value.split(',');
        setCitySelected({
            value: e.target.value,
            name: name.trim(),
            latitude: latitude.trim(),
            longitude: longitude.trim(),
        });
    };

    return (
        <div className="container-search-city">
            <label htmlFor="city-input-search">Entrez le nom de la ville à rechercher</label>
            <input
                id="city-input-search"
                type="text"
                placeholder="Entrez une ville"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
            />
            {error && <h2 className="error-message">{error}</h2>}
            {fetchCityResults.length > 0 && (
                <div className="container-select-city">
                    <p>Il y a {fetchCityResults.length} résultat(s), sélectionnez la ville correspondante :</p>
                    <select value={citySelected.value || ''} onChange={handleSelectCity}>
                        <option value="" disabled>Sélectionnez une ville</option>
                        {fetchCityResults.map((city, index) => (
                            <option key={index} value={`${city.name},${city.latitude},${city.longitude}`}>
                                {city.name} - {city.postcodes ? city.postcodes[0] : 'code postal non disponible'}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <WeatherDisplay weather={weather} citySelected={citySelected}/>
            <WeatherCode code={weatherCode}/>
        </div>
    );
};

export default WeatherSearch;
