// import fetch from "node-fetch";

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

// function init() {
//     destination.reload(1)
// }

//PreLoader Handler
// const preloader = document.getElementById('loader');
// const resultsDiv = document.getElementById('results');
// function showPreLoader(){
//     preloader.style.display = 'block';
//     resultsDiv.style.display = 'none';
// }
// function hidePreLoader(){
//     preloader.style.display = 'none';
//     resultsDiv.style.display = 'block';
// }

//Post Form Input
async function handleSubmit(event) {
    console.log("clicked!")
    event.preventDefault();
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;
    const errorMsg = document.getElementById('errorMsg');

    if(Client.checkForInput(destination, departureDate)) {
        // showPreLoader();
        const data = await postData('http://localhost:8081/destination', { destination, departureDate });
        console.log(data);
        tripsArray.push(data);
        localStorage.setItem('trips', JSON.stringify(tripsArray));
        displayTrip(data);
        // displayTrips(data);
    } else {
        errorMsg.innerHTML = "Please enter both destination and departure date!"
        errorMsg.style.color = "red";
        // setTimeout(init, 3000);
    }
}

//Add Local Storage
let tripsArray = localStorage.getItem('trips')
  ? JSON.parse(localStorage.getItem('trips'))
  : [];

localStorage.setItem('trips', JSON.stringify(tripsArray));
const localData = JSON.parse(localStorage.getItem('trips'));
console.log(localData);


//Display Trip Planning
let id = 0;
const showTrips = document.getElementById('showTrips');
const displayTrip = (trip) => {
    id += 1;
    const tripInfo = document.createElement('div');
    tripInfo.classList.add('tripInfo');
    tripInfo.id = (`tripInfo_${id}`);
    console.log(tripInfo.id);
    const location = document.createElement('div');
    const daysToTravel = document.createElement('div');

    location.classList.add('location');
    daysToTravel.classList.add('daysToTravel');

    location.innerHTML = trip.destination;

    //Calculate how many days away for travel
    const today = new Date();
    const current_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const  departure_date = trip.departureDate;
    const diffInMs = new Date(departure_date) - new Date(current_date);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    daysToTravel.innerHTML = "Your trip starts in: " + diffInDays + " days";

    //Display destination photos
    const showImage = document.createElement('div')
    showImage.classList.add('showImage');
    const next_btn = document.createElement('a');
    next_btn.classList.add('next');
    next_btn.innerHTML = "&#10095;"
    const prev_btn = document.createElement('a');
    prev_btn.classList.add('prev');
    prev_btn.innerHTML = "&#10094;";

    showImage.appendChild(prev_btn);
    showImage.appendChild(next_btn);

    for (let i = 0; i < trip.photos.length; i++) {
        const image_div = document.createElement('div');
        image_div.classList.add('image_div');
        const image = document.createElement('img');
        image.src = trip.photos[i];
        image_div.appendChild(image);
        showImage.appendChild(image_div);
    }

    //Photo Slideshow
    

    //Show & Hide weather forecast button
    const showWeather_btn = document.createElement('button');
    showWeather_btn.innerHTML = "Weather Forecast";
    showWeather_btn.classList.add('weather_btn');

    //16 days weather forecast 
    const forecast = trip.forecast;
    const showForecast = document.createElement('div');
    showForecast.classList.add('showForecast');
    showForecast.classList.add('collapsed');
    showForecast.appendChild(showWeather_btn);
    for ( let i = 0; i < forecast.length; i++){
        if (new Date(forecast[i].date) > new Date(departure_date)) {
            const forecast_div = document.createElement('div')
            forecast_div.classList.add('forecast_div');
            const forecast_date = document.createElement('div');
            const forecast_temp = document.createElement('div');
            const forecast_weather = document.createElement('div');
            const weather_icon = document.createElement('img');

            forecast_date.innerHTML = forecast[i].date;
            forecast_temp.innerHTML = forecast[i].high_temp + "&deg;C" + "/" + forecast[i].low_temp + "&deg;C" ;
            forecast_weather.innerHTML = forecast[i].weather.description;
            weather_icon.src = `./src/client/icons/${forecast[i].weather.icon}.png`;

            forecast_div.appendChild(forecast_date);
            forecast_div.appendChild(forecast_temp);
            forecast_div.appendChild(weather_icon);
            forecast_div.appendChild(forecast_weather);
            showForecast.appendChild(forecast_div);
        }
    }

    tripInfo.appendChild(location);
    tripInfo.appendChild(daysToTravel);
    // tripInfo.appendChild(showWeather_btn);
    tripInfo.appendChild(showForecast);
    tripInfo.appendChild(showImage);
    showTrips.appendChild(tripInfo);

    //Weather forecast display toggle
    const weather_btns = document.getElementsByClassName('weather_btn');
    const showForecasts = document.getElementsByClassName('showForecast');
    console.log('I am installing event listener');
    for (let i = 0; i < weather_btns.length; i++) {
        weather_btns[i].addEventListener("click", function() {
            console.log(`clicked! : ${showForecasts[i].style.display}`)
            showForecasts[i].classList.toggle("collapsed")
        });
    }


}

localData.forEach((data) => {
    displayTrip(data);
})

const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', function() {
    localStorage.clear();
})

// //Weather forecast display toggle
// const weather_btns = document.getElementsByClassName('weather_btn');
// const showForecasts = document.getElementsByClassName('showForecast');
// console.log('I am installing event listener');
// for (let i = 0; i < weather_btns.length; i++) {
//     weather_btns[i].addEventListener("click", function() {
//         console.log(`clicked! : ${showForecasts[i].style.display}`)
//         showForecasts[i].classList.toggle("collapsed")
//     });
// }

// //Display Trip Planning
// let id = 0;
// const showTrips = document.getElementById('showTrips');
// const displayTrip = (trip) => {
//     id += 1;
//     const tripInfo = document.createElement('div');
//     tripInfo.classList.add('tripInfo');
//     tripInfo.id = (`tripInfo_${id}`);
//     console.log(tripInfo.id);
//     const location = document.createElement('div');
//     const daysToTravel = document.createElement('div');

//     location.classList.add('location');
//     daysToTravel.classList.add('daysToTravel');

//     location.innerHTML = trip.destination;

//     //Calculate how many days away for travel
//     const today = new Date();
//     const current_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//     const  departure_date = trip.departureDate;
//     const diffInMs = new Date(departure_date) - new Date(current_date);
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//     daysToTravel.innerHTML = "Your trip starts in: " + diffInDays + " days";

//     //Display destination photos
//     const showImage = document.createElement('div')
//     showImage.classList.add('showImage');
//     const next_btn = document.createElement('a');
//     next_btn.classList.add('next');
//     next_btn.innerHTML = "&#10095;"
//     const prev_btn = document.createElement('a');
//     prev_btn.classList.add('prev');
//     prev_btn.innerHTML = "&#10094;";

//     showImage.appendChild(prev_btn);
//     showImage.appendChild(next_btn);

//     for (let i = 0; i < trip.photos.length; i++) {
//         const image_div = document.createElement('div');
//         image_div.classList.add('image_div');
//         const image = document.createElement('img');
//         image.src = trip.photos[i];
//         image_div.appendChild(image);
//         showImage.appendChild(image_div);
//     }

//     //Show & Hide weather forecast button
//     const showWeather_btn = document.createElement('button');
//     showWeather_btn.innerHTML = "Weather Forecast";
//     showWeather_btn.classList.add('weather_btn');

//     //16 days weather forecast 
//     const forecast = trip.forecast;
//     const showForecast = document.createElement('div');
//     showForecast.classList.add('showForecast');
//     showForecast.classList.add('collapsed');
//     showForecast.appendChild(showWeather_btn);
//     for ( let i = 0; i < forecast.length; i++){
//         if (new Date(forecast[i].date) > new Date(departure_date)) {
//             const forecast_div = document.createElement('div')
//             forecast_div.classList.add('forecast_div');
//             const forecast_date = document.createElement('div');
//             const forecast_temp = document.createElement('div');
//             const forecast_weather = document.createElement('div');
//             const weather_icon = document.createElement('img');

//             forecast_date.innerHTML = forecast[i].date;
//             forecast_temp.innerHTML = forecast[i].high_temp + "&deg;C" + "/" + forecast[i].low_temp + "&deg;C" ;
//             forecast_weather.innerHTML = forecast[i].weather.description;
//             weather_icon.src = `./src/client/icons/${forecast[i].weather.icon}.png`;

//             forecast_div.appendChild(forecast_date);
//             forecast_div.appendChild(forecast_temp);
//             forecast_div.appendChild(weather_icon);
//             forecast_div.appendChild(forecast_weather);
//             showForecast.appendChild(forecast_div);
//         }
//     }

//     tripInfo.appendChild(location);
//     tripInfo.appendChild(daysToTravel);
//     // tripInfo.appendChild(showWeather_btn);
//     tripInfo.appendChild(showForecast);
//     tripInfo.appendChild(showImage);
//     showTrips.appendChild(tripInfo);
// }

// localData.forEach((data) => {
//     displayTrip(data);
// })

// const deleteBtn = document.getElementById('delete');
// deleteBtn.addEventListener('click', function() {
//     localStorage.clear();
// })

export { handleSubmit }
