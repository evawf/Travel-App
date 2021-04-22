import { handleSubmit } from './js/formHandler.js';
import { initializeAndDisplayTrips, deleteAllTrips } from './js/tripManagement.js';
import { departureDate } from './js/inputChecker';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

import '../client/icons/a01d.png';
import '../client/icons/a02d.png';
import '../client/icons/a03d.png';
import '../client/icons/a04d.png';
import '../client/icons/a05d.png';
import '../client/icons/a06d.png';

import '../client/icons/c01d.png';
import '../client/icons/c02d.png';
import '../client/icons/c03d.png';
import '../client/icons/c04d.png';

import '../client/icons/d01d.png';
import '../client/icons/d02d.png';
import '../client/icons/d03d.png';
import '../client/icons/f01d.png';

import '../client/icons/r01d.png';
import '../client/icons/r02d.png';
import '../client/icons/r03d.png';
import '../client/icons/r04d.png';
import '../client/icons/r05d.png';
import '../client/icons/r06d.png';

import '../client/icons/s01d.png';
import '../client/icons/s02d.png';
import '../client/icons/s03d.png';
import '../client/icons/s04d.png';
import '../client/icons/s05d.png';
import '../client/icons/s06d.png';

import '../client/icons/t01d.png';
import '../client/icons/t02d.png';
import '../client/icons/t03d.png';
import '../client/icons/t04d.png';
import '../client/icons/t05d.png';
import '../client/icons/u00d.png';

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

//Delete All Trips
const deleteBtn = document.getElementById('deleteTrips');
deleteBtn.addEventListener('click', deleteAllTrips);
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