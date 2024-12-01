
// import
const axios = require("axios");

/**
 * - Fonction pour récupérer les coordonées en fonction de la position
 * @param {string} city
 * @returns {JSON}
 * - Retourne un JSON
 */
const getCityCoords = async (city) => {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=100&language=fr&format=json`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error.message);
        return null;
    }
};

// export
module.exports = getCityCoords;