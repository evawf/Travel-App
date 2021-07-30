# Travel-App
This the final project for Udacity Front-End Web Developer Course. This project requires minimumly to build out a travel app to obtains a desired trip destination & date from the user, and displays weather and an image of the destination using information obtained from external APIs.

I developed this travel app to pull data from APIs and then to display the destination, how many days away for departure, weather forecast for multiple days(within 16 days from today), and photos for the destination with the user's input of __Destination__ and __Departure Date__. Users can add multiple trips, remove individual trips or remove all trips in one click. 

## Key skills to practice
- HTML, CSS and Javascript
- DOM
- Call APIs
- Webpack enviroment
- Express server
- Service worker
- Debug
- Coding strategy 

## APIs Used
- Weatherbit API: click [here](https://www.weatherbit.io/) for more details
- Geonames API: click [here](https://www.geonames.org/) to view API info
- Pixabay API: click [here](https://pixabay.com/api/docs/) find the API documentation

## Installation
- Download/clone this repo 
- Run `npm install` in the terminal to install all required dependencies
- Add .env file and input the api keys:
```
GEONAMES_API_KEY=
WEATHERBIT_API_KEY=
PIXABAY_API_KEY=
NODE_ENV = "production"
```
- `npm run build-prod`
- Run `npm run start` to start the app at port 8081

## Extend Options
- I used Local Storage to save the data.
- Pull the forecast for multiple days.

## Deploy in Heroku
Check [here](https://travel-app.herokuapp.com/) to try this app. 