let tripsData = {
    trips: [],
    maxId: 0,
};

const initializeAndDisplayTrips = () => {
    //get trips from local storage
    let localStorageTrips = localStorage.getItem('trips')
    if( localStorageTrips ) {
        tripsData = JSON.parse(localStorage.getItem('trips'))
    }

    //update UI
    updateTripUI();
};

//displayTrip(data);
const addNewTrip = (trip) => {
    trip['id'] = tripsData.maxId;
    tripsData.maxId ++;
    trip['activeImage'] = 0;
    tripsData.trips.push(trip);
    localStorage.setItem('trips', JSON.stringify(tripsData));

    updateTripUI();
};

const deleteAllTrips = () => {
    tripsData.trips = [];
    tripsData.maxId = 0;
    localStorage.setItem('trips', JSON.stringify(tripsData));
    document.getElementById('deleteTrips').style.display = "none";
    updateTripUI();
};

//Function to Sort trips by departure date
function sortTrips(a, b){
    let dateA = new Date(a.departureDate).getTime();
    let dateB = new Date(b.departureDate).getTime();
    return dateA > dateB ? 1 : -1;
};

//Display sorted trips
const showTrips = document.getElementById('showTrips');
const updateTripUI = () => {
    showTrips.innerHTML = '';
    let sortedTrips = tripsData.trips.sort(sortTrips);
    sortedTrips.forEach((trip) => {
        addTripUI(trip);
    });
};

//Add Trip
const addTripUI = (trip) => {
    let id = trip.id;
    const tripCard = document.createElement('div');
    tripCard.classList.add('tripCard');
    tripCard.id = (`tripCard_${id}`);
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

    if (diffInDays == "NaN"){
        daysToTravel.innerHTML = "Your trip starts in: " + today + " days";
    }

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
            weather_icon.src = `/src/client/icons/${forecast[i].weather.icon}.png`;

            forecast_div.appendChild(forecast_date);
            forecast_div.appendChild(forecast_temp);
            forecast_div.appendChild(weather_icon);
            forecast_div.appendChild(forecast_weather);
            showForecast.appendChild(forecast_div);
        }
    }

    tripCard.appendChild(location);
    tripCard.appendChild(daysToTravel);
    tripCard.appendChild(showForecast);
    
    //Weather forecast display toggle
    showWeather_btn.addEventListener("click", function() {
        showForecast.classList.toggle("collapsed");
    });

    //Display destination photos
    const showImage = document.createElement('div')
    showImage.classList.add('showImage');

    const image_div = document.createElement('div');
    image_div.classList.add('image_div');
    const image = document.createElement('img');
    image.src = trip.photos[trip.activeImage];
    image.id = `trip_${id}_image`
    image_div.appendChild(image);
       
    showImage.appendChild(image_div);
    tripCard.appendChild(showImage);
    const next_btn = document.createElement('a');
    next_btn.classList.add('next');
    next_btn.innerHTML = "&#10095;"
    const prev_btn = document.createElement('a');
    prev_btn.classList.add('prev');
    prev_btn.innerHTML = "&#10094;";

    prev_btn.addEventListener("click", function() {
        if( trip.activeImage === 0 ) {
            trip.activeImage = trip.photos.length - 1;
        } else {
            trip.activeImage --;
        }
        image.src = trip.photos[trip.activeImage];
    });

    next_btn.addEventListener("click", function() {
        if( trip.activeImage === trip.photos.length - 1 ) {
            trip.activeImage = 0;
        } else {
            trip.activeImage ++;
        }
        image.src = trip.photos[trip.activeImage];
    });

    showImage.appendChild(prev_btn);
    showImage.appendChild(next_btn);
    showTrips.appendChild(tripCard);

    //Delete Single Trip
    const deleteSingleTrip = document.createElement('a');
    deleteSingleTrip.classList.add('deleteTrip');
    deleteSingleTrip.innerHTML = "Remove ";

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa');
    deleteIcon.classList.add('fa-trash');
    deleteSingleTrip.appendChild(deleteIcon);
    tripCard.appendChild(deleteSingleTrip);
    deleteSingleTrip.addEventListener('click', function(){
        let n = tripsData.trips.findIndex( trip => trip.id == id)
        if ( tripsData.trips.length > 1 ) {
            for ( let i = 0; i < tripsData.trips.length; i++) {
                if ( id == tripsData.trips[i].id){
                    tripsData.trips.splice(n, 1);
                    localStorage.setItem('trips', JSON.stringify(tripsData));
                    updateTripUI();
                }
            }
        } else {
            deleteAllTrips();
        }
    });
    
    if (tripsData.trips.length > 1) {
        document.getElementById('deleteTrips').style.display = "block";
    }
}

export {
    initializeAndDisplayTrips,
    addNewTrip,
    deleteAllTrips,
};