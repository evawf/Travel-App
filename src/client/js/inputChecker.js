import datepicker from 'js-datepicker'

//Block Past Dates
// const dateControl = document.getElementById('departureDate');
// let current_datetime = new Date();
// let minDateMonth = current_datetime.getMonth() + 1;
// if (minDateMonth < 10) { minDateMonth = "0"+minDateMonth; }
// let minDate = current_datetime.getFullYear() + "-" + minDateMonth + "-" + (current_datetime.getDate() + 1);
// dateControl.setAttribute("min", minDate);

const getToday = () => new Date();
const departureDate = datepicker('#departureDate', {
    minDate: getToday(),
    datePicked: getToday(),
    position: 'bl'
});

let checkForInput = (destination, departureDate) => {
    if(destination !== "" && departureDate !== ""){
        return true;
    }
}

export { checkForInput }