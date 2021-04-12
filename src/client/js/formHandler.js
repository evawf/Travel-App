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
        displayTrips(data);
    } else {
        errorMsg.innerHTML = "Please enter both destination and departure date!"
        errorMsg.style.color = "red";
        // setTimeout(init, 3000);
    }
}


//Display Trip Planning
const displayTrips = (data) => {
    //Show recent trip input
    const recentTripInfo = data[data.length-1];
    console.log(recentTripInfo);
    document.getElementById('location').innerHTML = "Trip to: " + recentTripInfo.destination;
    document.getElementById('date').innerHTML = "Departure date: " + recentTripInfo.departureDate;
    const weatherForecast = recentTripInfo.forecast;
    for (let i = 0; i < weatherForecast.length; i++) {
        if(weatherForecast[i].date == recentTripInfo.departureDate){
            document.getElementById('temp').innerHTML = weatherForecast[i].temp + "&deg;C";
        }
    }

    //List past trip

    //List future trip

}

export { handleSubmit }
