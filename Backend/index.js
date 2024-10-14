
// import
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const weatherController = require('./Controllers/weatherController')
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/weather/:city', weatherController.weatherCity);
app.get('/weather/:latitude/:longitude', weatherController.weatherByCoords);

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port http://localhost:${PORT}`);
});
