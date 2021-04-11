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

//Block past dates
const dateControl = document.getElementById('departureDate');
console.log(dateControl);
let current_datetime = new Date();
console.log(current_datetime);
let minDateMonth = current_datetime.getMonth() + 1;
if (minDateMonth < 10) { minDateMonth = "0"+minDateMonth; }
let minDate = current_datetime.getFullYear() + "-" + minDateMonth + "-" + (current_datetime.getDate() + 1);
console.log(minDate);
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