
// import
const getCityCoords = require("../const/getCityCoords");
const getWeatherWithCoords = require("../const/getWeatherWithCoords");


// Récupère les coordonnées de la ville
const weatherCity = async (req, res) => {
    try {
        // Récupère les coordonnées de la ville
        const {city} = req.params;
        if (!city) {
            return res.status(400).json({error: "Veuillez renseigner une ville"});
        }

        // Appelle la fonction de récupération des données pour les coordonnées
        const cityCoords = await getCityCoords(city);
        if (!cityCoords) {
            return res.status(500).json({error: "Erreur lors de la récupération des données (LONGITUDE / LATITUDE)"});
        }
        // Renvoie les données météo
        res.json(cityCoords);
    } catch (error) {
        console.error("Erreur dans le contrôleur weatherCity :", error.message);
        res.status(500).json({error: "Erreur interne du serveur"});
    }
};

// Récupère la météo de la ville par les coordonnées
const weatherByCoords = async (req,res) => {
    try {
        const {latitude, longitude} = req.params;
        if (!latitude || !longitude) {
            return res.status(400).json({error: "veuillez renseigner les paramètres"})
        }
        const weather = await getWeatherWithCoords(latitude, longitude);
        if (!weather) {
            return res.status(500).json({error: "Erreur lors de la récupération des données meteo"})
        }

        res.json(weather);
    } catch (error){
        console.error("Erreur dans le contrôleur weatherByCoords :", error.message);
        res.status(500).json({error: "Erreur interne du serveur"});
    }
};

// export
module.exports = {
    weatherCity,
    weatherByCoords
}