if (process.env.Node_ENV !== "production") {
    require('dotenv').config();
}

const Geonames_username = process.env.GEONAMES_API_KEY;
const Weather

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
    // let weatherData = await getWeatherData();
    const location = req.body.location;
    let GeoData = await getGeoData(location);
    // let PixaData = await getPixaData();
    // let addData = {
    //     model: results.model,
    //     score_tag: results.score_tag,
    //     agreement: results.agreement,
    //     subjectivity: results.subjectivity,
    //     confidence: results.confidence,
    //     irony: results.irony
    // }
    console.log(GeoData);
    res.send(GeoData);
}

//Fetch API data
// const getData = async (url) => {
//     const res = await fetch(url) 
//     try{
//         const Data = await res.json();
//         return Data;
//         console.log(Data);
//     }
//     catch(error){
//         console.log('error', error);
//     }
// }

//Fetch Geonames API data
const getGeoData =  async (location) => {
    const baseURL = "http://api.geonames.org/searchJSON?q=";
    const subURL = location + "&maxRows=1&username=" + Geonames_username;
    const url = baseURL + subURL;
    const res = await fetch(url)
    try{
        const Data = await res.json();
        console.log(Data);
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

