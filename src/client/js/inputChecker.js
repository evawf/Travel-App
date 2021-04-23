import datepicker from 'js-datepicker'

//JS Datepicker settings
const getToday = () => new Date();
const departureDate = datepicker('#departureDate', {
    minDate: getToday(),
    datePicked: getToday(),
    position: 'tr'
});

departureDate.calendarContainer.style.setProperty('font-size', '2rem')

let checkForInput = (destination, departureDate) => {
    if(destination !== "" && departureDate !== ""){
        return true;
    }
}

export { checkForInput }