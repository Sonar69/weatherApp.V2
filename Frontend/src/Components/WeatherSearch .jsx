import React, {useEffect, useState} from 'react';
import "../css/WeatherSearch.css"
import WeatherDisplay from "./WeatherDisplay .jsx";
import axios from "axios";
import WeatherCode from "./WeatherCode.jsx";

const WeatherSearch = () => {
    const [citySearch, setCitySearch] = useState('');
    const [citySelected, setCitySelected] = useState({});
    const [error, setError] = useState(null);
    const [fetchCity, setFetchCity] = useState([]);
    const [weather, setWeather] = useState(null);
    const [weatherCode, setWeatherCode] = useState("");

    // Fetch cities based on search
    const getCity = async () => {
        if (!citySearch.trim) return;

        // AbortController, permet d'annuler une requête
        const controller = new AbortController();
        const signal = controller.signal;

        // Récupération des données de la ville
        try {
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${citySearch}&count=100&language=fr&format=json`, {signal});
            setFetchCity(response.data.results ? response.data.results : []);
            setError(null);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Requête annuler dans getCity()');
            } else {
                setError('Erreur lors de la récupération des données de la ville');
            }
        }

        // Nettoyage de la requête si le composant change
        return () => controller.abort();
    };

    // Handle city selection
    const handleSelectCity = (e) => {
        const [name, latitude, longitude] = e.target.value.split(',');
        // set de la ville avec ses informations
        setCitySelected({
            value: e.target.value,
            name: name.trim(),
            latitude: latitude.trim(),
            longitude: longitude.trim(),
        });
    };

    // Fetch weather data for selected city
    const handleWeatherCity = async (latitude, longitude) => {
        if (!latitude || !longitude) return;

        const controller = new AbortController();
        const signal = controller.signal;

        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`, {signal});
            setWeather(response.data);
            setWeatherCode(response.data.current.weather_code);
            setError(null);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Requête annuler dans handleWeatherCity()');
            } else {
                setError('Erreur lors de la récupération des données météorologiques');
            }
        }
    };

    // Watch for changes
    useEffect(() => {
        // ajout d'un timer pour éviter trop de requête a l'API
        const timer = setTimeout(() => {
            if (citySearch) {
                getCity();
            } else {
                setFetchCity([]);
            }
        }, 500);

        // annulation du timer lorsque le composant se désinstalle pour éviter de créer un timer infini
        return () => clearTimeout(timer);
    }, [citySearch]);

    useEffect(() => {
        if (citySelected.latitude && citySelected.longitude) {
            handleWeatherCity(citySelected.latitude, citySelected.longitude);
        }
    }, [citySelected])

    useEffect(() => {
        // Réinitialiser la sélection de ville lorsque les résultats de recherche changent
        setCitySelected({});
    }, [fetchCity]);

    return (
        <div className="container-search-city">
            <label htmlFor="city-input-search">Entrez le nom de la ville a rechercher</label>
            <input
                id="city-input-search"
                type="text"
                placeholder="Entrez une ville"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
            />

            {/* gestion des erreurs possibles*/}
            {error && <h2 className="error-message">{error}</h2>}

            {/* Affichage des résultats de la recherche*/}
            {fetchCity.length > 0 && (
                <div className="container-select-city">
                    <p>Il y a {fetchCity.length} résultat(s), sélectionnez la ville correspondante :</p>
                    <select value={citySelected.value || ''} onChange={handleSelectCity}>
                        <option value="" disabled>Sélectionnez une ville</option>
                        {fetchCity.map((city, index) => (
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
