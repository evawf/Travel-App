if (process.env.Node_ENV !== "production") {
    require('dotenv').config();
}

const Geonames_username = process.env.GEONAMES_API_KEY;
const Weatherbit_apiKey = process.env.WEATHERBIT_API_KEY;

const path = require('path');
const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const fetch = require("node-fetch");
const { response } = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.json());

// designates what port the app will listen to for incoming requests
const port = process.env.PORT || 8081;
app.listen(port, function () {
    console.log(`App is running on port ${port}!`)
});

app.get('/', 
    (req, res) => res.sendFile('dist/index.html', { root: __dirname })
)

let data = []
app.post('/analyse', getAnalysis);
async function getAnalysis(req, res){
    // const formInput = req.body.formInput;
    const location = req.body.location;
    let GeoData = await getGeoData(location);
    let lon = GeoData.geonames[0].lng;
    let lat = GeoData.geonames[0].lat;
    let WeatherData = await getWeatherData(lat, lon); 
    console.log(WeatherData);

    
    // let PixaData = await getPixaData();
    // let addData = {
    //     model: results.model,
    //     score_tag: results.score_tag,
    //     agreement: results.agreement,
    //     subjectivity: results.subjectivity,
    //     confidence: results.confidence,
    //     irony: results.irony
    // }
    
    res.send(GeoData);
}

//Fetch Weatherbit API data
const getWeatherData = async (lat, lon) => {
    const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
    const subURL = "&lat=" + lat + "&lon=" + lon + "&key=" + Weatherbit_apiKey;
    const url = baseURL + subURL;
    const res = await fetch(url) 
    try{
        const Data = await res.json();
        return Data;
    }
    catch(error){
        console.log('error', error);
    }
}

//Fetch Geonames API data
const getGeoData =  async (location) => {
    const baseURL = "http://api.geonames.org/searchJSON?q=";
    const subURL = location + "&maxRows=1&username=" + Geonames_username;
    const url = baseURL + subURL;
    const res = await fetch(url)
    try{
        const Data = await res.json();
        return Data;
    }
    catch(error){
        console.log('error', error);
    }
}

// function getPixaData(key, input) {
//     const baseURL = "";
//     const subURL = "";
// }

