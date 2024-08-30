require('dotenv').config(); 
const express = require('express'); 
const axios = require('axios'); 
const app = express(); 
const port = 3000; 

const openCageAPIKey = process.env.OPENCAGE_API_KEY;

// Serve static files from public directory
app.use(express.static(`public`));

// REST API endpoint to fetch weather data
app.get(`/weather`, async (req, res) => {
    const city = req.query.city;
    const geoURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${openCageAPIKey}`;


    try {
        const geoResponse = await axios.get(geoURL);
        const geoData = geoResponse.data;

        if (geoData.results.length == 0) {
            return res.status(404).send('City not found');
        }
        const {lat, lng} = geoData.results[0].geometry; 
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`;

        
        const weatherResponse = await axios.get(weatherURL);
        res.json(weatherResponse.data); 
    } catch(error) {
        res.status(500).send(`Error fetching weather data`);
    }
}); 

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});