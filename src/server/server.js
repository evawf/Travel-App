if (process.env.Node_ENV !== "production") {
    require('dotenv').config();
}
const apiKey = process.env.API_KEY;

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

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root: __dirname })
});

app.post('/analyse', getAnalysis);
async function getAnalysis(req, res){
    const formInput = req.body.formInput;
    let results = await getAnalysisData(formInput);
    let addData = {
        model: results.model,
        score_tag: results.score_tag,
        agreement: results.agreement,
        subjectivity: results.subjectivity,
        confidence: results.confidence,
        irony: results.irony
    }
    res.send(addData);
}

//Fetch API data
const getAnalysisData = async (formInput) => {
    const baseURL = "http://api.meaningcloud.com";
    const subURL = "/sentiment-2.1?key=" + apiKey + "&lang=auto&url=" + formInput;
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