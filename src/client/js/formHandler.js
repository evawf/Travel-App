import fetch from "node-fetch";

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

function init() {
    destination.reload(1)
}

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

//Local Storage Settings
let tripsArray = localStorage.getItem('trips')
  ? JSON.parse(localStorage.getItem('trips'))
  : []

  localStorage.setItem('trips', JSON.stringify(tripsArray))
  const localData = JSON.parse(localStorage.getItem('trips'))
console.log(localData);

// Post Form Input
async function handleSubmit(event) {
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


//Display Trip Planning
const showTrips = document.getElementById('showTrips');
const displayTrip = (trip) => {
    const tripInfo = document.createElement('div');
    tripInfo.classList.add('tripInfo');
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

    //Show & Hide weather forecast button
    const showWeather_btn = document.createElement('button');
    showWeather_btn.innerHTML = " Weather Forecast + ";
    showWeather_btn.classList.add('weather_btn');

    //16 days weather forecast 
    const forecast = trip.forecast;
    const showForecast = document.createElement('div');
    showForecast.classList.add('showForecast');
    for ( let i = 0; i < forecast.length; i++){
        if (new Date(forecast[i].date) > new Date(departure_date)) {
            const forecast_div = document.createElement('div')
            forecast_div.classList.add('forecast_div');
            const forecast_date = document.createElement('div');
            const forecast_temp = document.createElement('div');
            const forecast_weather = document.createElement('div');

            forecast_date.innerHTML = forecast[i].date;
            forecast_temp.innerHTML = forecast[i].temp + "&deg;C";
            forecast_weather.innerHTML = forecast[i].weather.description;

            forecast_div.appendChild(forecast_date);
            forecast_div.appendChild(forecast_temp);
            forecast_div.appendChild(forecast_weather);
            showForecast.appendChild(forecast_div);
        }
    }

    tripInfo.appendChild(location);
    tripInfo.appendChild(daysToTravel);
    tripInfo.appendChild(showWeather_btn);
    tripInfo.appendChild(showForecast);
    showTrips.appendChild(tripInfo);
}



// const displayTrips = (data) => {
//     //Show recent trip input
//     const recentTripInfo = data[data.length-1];
//     console.log(recentTripInfo);
//     document.getElementById('location').innerHTML = recentTripInfo.destination;
//     document.getElementById('date').innerHTML = "Departure date: " + recentTripInfo.departureDate;
//     const weatherForecast = recentTripInfo.forecast;
//     for (let i = 0; i < weatherForecast.length; i++) {
//         if(weatherForecast[i].date == recentTripInfo.departureDate){
//             document.getElementById('temp').innerHTML = weatherForecast[i].temp + "&deg;C";
//             document.getElementById('weather').innerHTML = weatherForecast[i].weather.description;
//         }
//     }

//     //SlideShow for destination photos
//     const photos = recentTripInfo.photos;
//     const slides_container = document.getElementById('slides_container');
//     for (let i = 0; i < photos.length; i++) {
//         const img_container = document.createElement('div');
//         const img = document.createElement('img');
//         img_container.classList.add('img_container');
//         img.src = photos[i];
//         img_container.appendChild(img);
//         slides_container.appendChild(img_container);
//     }

//     let slideIndex = 1;
//     showSlides(slideIndex);

//     window.plusSlides = (n) => {
//         showSlides(slideIndex += n);
//     }

//     function showSlides(n) {
//         let i;
//         const img_containers = document.getElementsByClassName('img_container');
//         if (n > img_containers.length) { slideIndex = 1 }
//         if (n < 1) { slideIndex = img_containers.length }
//         for (i = 0; i < img_containers.length; i++) {
//             img_containers[i].style.display = "none";
//         }
//         img_containers[slideIndex-1].style.display = "block";
//     }
// }

localData.forEach((data) => {
    displayTrip(data);
})

const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', function() {
    localStorage.clear();
})

export { handleSubmit }
