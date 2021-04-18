import { handleSubmit } from './js/formHandler.js';
import { initializeAndDisplayTrips, deleteAllTrips } from './js/tripManagement.js'
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

export {
     handleSubmit,
}

//Block Past Dates
const dateControl = document.getElementById('departureDate');
let current_datetime = new Date();
let minDateMonth = current_datetime.getMonth() + 1;
if (minDateMonth < 10) { minDateMonth = "0"+minDateMonth; }
let minDate = current_datetime.getFullYear() + "-" + minDateMonth + "-" + (current_datetime.getDate() + 1);
dateControl.setAttribute("min", minDate);

const deleteBtn = document.getElementById('deleteTrips');
deleteBtn.addEventListener('click', deleteAllTrips );

initializeAndDisplayTrips();

// Check that service workers are supported
if (process.env.NODE_ENV === "production") {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
} else {
    console.log("This is dev mode!");
}