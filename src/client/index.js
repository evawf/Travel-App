import { handleSubmit } from './js/formHandler';
import { checkForInput } from './js/inputChecker';
import { displayTrips } from './js/displayTrips';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

export {
    checkForInput,
    handleSubmit,
    displayTrips
}

//Add Background to header
document.getElementById('header').style.background = "url('.src/client/media/cover1.jpg') cover fixed no-repeat";

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

displayTrips();


//Image Slide

// const tripInfo = document.getElementsByClassName('tripInfo');
// for ( let i = 0; i < tripInfo.length; i++) {
//     const id = 'tipInfo-'+i;
//     tripInfo[i].id = id;
//     const next_btn = document.createElement('a');
//     next_btn.classList.add('next');
//     next_btn.innerHTML = "&#10095;"
//     const prev_btn = document.createElement('a');
//     prev_btn.classList.add('prev');
//     prev_btn.innerHTML = "&#10094;";

//     next_btn.addEventListener("click", function(e) {
//         console.log("clicked!")
//         plusSlides(id,1);
//     });
//     prev_btn.addEventListener("click", function(e) {
//         plusSlides(id,-1);
//     });

//     tripInfo[i].appendChild(prev_btn);
//     tripInfo[i].appendChild(next_btn);
//     //slideshowsActive[id]=1;
//     initSlides(id);
// }

// let slideIndex = 1;
// showSlides(slideIndex);
// let slideshows = {};
// function initSlides(id) {
//     slideshows[id] = {
//         index: 1
//     }
// }
// function plusSlides(id, n) {

//     showSlides(id, slideIndex += n);
// }

// function showSlides(id, n) {
//     let i;
//     const image_div = document.getElementById(id).getElementsByClassName('image_div');
//     if (n > image_div.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = image_div.length }
//     for (i = 0; i < image_div.length; i++) {
//         image_div[i].style.display = "none";
//     }
//     if( image_div[slideIndex-1] ){
//         image_div[slideIndex-1].style.display = "block";
//     }
// }
