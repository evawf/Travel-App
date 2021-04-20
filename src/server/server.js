if (process.env.Node_ENV !== "production") {
    require('dotenv').config();
}

const Geonames_username = process.env.GEONAMES_API_KEY;
const Weatherbit_apiKey = process.env.WEATHERBIT_API_KEY;
const Pixabay_apiKey = process.env.PIXABAY_API_KEY;

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

//Port the app will listen to for incoming requests
const port = process.env.PORT || 8081;
app.listen(port, function () {
    console.log(`App is running on port ${port}!`)
});

app.get('/', 
    (req, res) => res.sendFile('dist/index.html', { root: __dirname })
);

let projectData = {};
app.get('/trips', getTrips)
async function getTrips(req, res){
    projectData = {
        data: data
    }
    res.send(projectData);
}

// let data = [];
app.post('/destination', getDestinationInfo);
async function getDestinationInfo(req, res){
    const destination = req.body.destination;
    const departureDate = req.body.departureDate;
    const days = 16;

    //Call GeoData
    let GeoData = await getGeoData(destination);
    console.log(GeoData);  
    let lon = GeoData.geonames[0].lng;
    let lat = GeoData.geonames[0].lat;

    //Call WeatherData
    let WeatherData = await getWeatherData(lat, lon, days);
    let forecast = [];
    for(let i = 0; i < 16; i++){
        let date = WeatherData.data[i].datetime;
        let high_temp = WeatherData.data[i].high_temp;
        let low_temp = WeatherData.data[i].low_temp;
        let weather = WeatherData.data[i].weather;
        let weatherInfo = {date, high_temp, low_temp, weather}
        forecast.push(weatherInfo);
        console.log(forecast);
    };
  
    //Call Pixabay for Photos
    let countryName = GeoData.geonames[0].countryName;
    PixabayData = await getPixaData(destination);
    if(PixabayData.total == 0) {
        PixabayData = await getPixaData(countryName);
    } 
    console.log(PixabayData);
    let photos = [];
    for(let i = 0; i < 20; i++){
        let photoUrl = PixabayData.hits[i].webformatURL;
        photos.push(photoUrl);
    };
   
    //Save data to project endpoint
    let addData = {
        destination: destination,
        departureDate: departureDate,
        forecast: forecast,
        photos: photos
    };
    // data.push(addData);
    // console.log(data);
    console.log(addData);
    res.send(addData);
}

//Fetch Weatherbit API data
const getWeatherData = async (lat, lon, days) => {
    const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
    const subURL = "&lat=" + lat + "&lon=" + lon + "&key=" + Weatherbit_apiKey + "&days=" + days;
    const url = baseURL + subURL;
    const res = await fetch(url);
    try{
        const Data = await res.json();
        return Data;
    }
    catch(error){
        console.log('error', error);
    }
}

//Fetch Geonames API data
const getGeoData =  async (destination) => {
    const baseURL = "http://api.geonames.org/searchJSON?q=";
    const subURL = destination + "&maxRows=1&username=" + Geonames_username;
    const url = baseURL + subURL;
    const res = await fetch(url);
    try{
        const Data = await res.json();
        return Data;
    }
    catch(error){
        console.log('error', error);
    }
}

//Fetch Pixabay API Data
const getPixaData = async (destination) => {
    const baseURL = "https://pixabay.com/api/?key=";
    const subURL = Pixabay_apiKey + "&q=" + destination + "&image_type=photo";
    const url = baseURL + subURL;
    const res = await fetch(url);
    try{
        const Data = await res.json();
        return Data;
    }
    catch(error){
        console.log('error', error);
    }
}