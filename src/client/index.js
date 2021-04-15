import { handleSubmit } from './js/formHandler';
import { checkForInput } from './js/inputChecker';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

export {
    checkForInput,
    handleSubmit
}

console.log("connected!!!");

//Block Past Dates
const dateControl = document.getElementById('departureDate');
let current_datetime = new Date();
let minDateMonth = current_datetime.getMonth() + 1;
if (minDateMonth < 10) { minDateMonth = "0"+minDateMonth; }
let minDate = current_datetime.getFullYear() + "-" + minDateMonth + "-" + (current_datetime.getDate() + 1);
dateControl.setAttribute("min", minDate);


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

//Weather forecast display toggle
const weather_btns = document.getElementsByClassName('weather_btn');
const showForecasts = document.getElementsByClassName('showForecast');
for (let i = 0; i < weather_btns.length; i++) {
    weather_btns[i].addEventListener("click", function() {
        if (showForecasts[i].style.display === "none") {
            showForecasts[i].style.display = "block";
        } else {
            showForecasts[i].style.display = "none";
        }
    });
}