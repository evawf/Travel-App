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


// Check that service workers are supported
if (process.env.NODE_ENV === "production") {
    if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
} else {
    console.log("This is dev mode!");
}