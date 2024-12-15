import axios from 'axios';

const BASE_URL_GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const BASE_URL_WEATHER = 'https://api.open-meteo.com/v1/forecast';

/**
 * Rechercher une ville par son nom.
 * @param {string} cityName - Le nom de la ville à rechercher.
 * @returns {Promise<Object[]>} Une promesse résolvant une liste de villes correspondantes.
 */
export const fetchCity = async (cityName) => {
    try {
        const response = await axios.get(BASE_URL_GEO, {
            params: {
                name: cityName,
                count: 100,
                language: 'fr',
                format: 'json',
            },
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des données de la ville:', error);
        throw new Error('Erreur lors de la récupération des données de la ville.');
    }
};

/**
 * Récupérer les données météorologiques pour une latitude et une longitude données.
 * @param {number} latitude - La latitude de la ville.
 * @param {number} longitude - La longitude de la ville.
 * @returns {Promise<Object>} Une promesse résolvant les données météorologiques.
 */
export const fetchWeather = async (latitude, longitude) => {
    try {
        const response = await axios.get(BASE_URL_WEATHER, {
            params: {
                latitude: latitude,
                longitude: longitude,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
                hourly: 'temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration',
                timezone: 'Europe/Berlin',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques:', error);
        throw new Error('Erreur lors de la récupération des données météorologiques.');
    }
};
