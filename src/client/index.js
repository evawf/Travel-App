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
        console.log("clicked!")
        if (showForecasts[i].style.display === "none") {
            showForecasts[i].style.display = "block";
            weather_btns[i].innerHTML = " Weather Forecast - ";
        } else {
            showForecasts[i].style.display = "none";
            weather_btns[i].innerHTML = " Weather Forecast + "
        }
    });
}


//Image Slide

const tripInfo = document.getElementsByClassName('tripInfo');
for ( let i = 0; i < tripInfo.length; i++) {
    const next_btn = document.createElement('a');
    next_btn.classList.add('next');
    next_btn.innerHTML = "&#10095;"
    const prev_btn = document.createElement('a');
    prev_btn.classList.add('prev');
    prev_btn.innerHTML = "&#10094;";

    next_btn.addEventListener("click", function(e) {
        console.log("clicked!")
        plusSlides(1);
    });
    prev_btn.addEventListener("click", function(e) {
        plusSlides(-1);
    });

    tripInfo[i].appendChild(prev_btn);
    tripInfo[i].appendChild(next_btn);
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const image_div = document.getElementsByClassName('image_div');
    if (n > image_div.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = image_div.length }
    for (i = 0; i < image_div.length; i++) {
        image_div[i].style.display = "none";
    }
    image_div[slideIndex-1].style.display = "block";
}
