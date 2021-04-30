import { checkForInput } from './inputChecker';
import { addNewTrip } from './tripManagement';

//Internal functions
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
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

//PreLoader Handler
const preloader = document.getElementById('loader');
function showPreLoader(){
    preloader.style.display = 'block';
}
function hidePreLoader(){
    preloader.style.display = 'none';
}

//Post Form Input
async function handleSubmit(event) {
    event.preventDefault();
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;
    const errorMsg = document.getElementById('errorMsg');

    if(checkForInput(destination, departureDate)) {
        showPreLoader();
        const tripData = await postData('http://localhost:8081/destination', { destination, departureDate });
        hidePreLoader();
        addNewTrip(tripData);
    } else {
        errorMsg.innerHTML = "Please enter both destination and departure date!"
        errorMsg.style.color = "red";
    }
}

export { handleSubmit }
