let checkForInput = (destination, departureDate) => {
    if(destination !== "" && departureDate !== ""){
        const ToDate = new Date();
        return (new Date(departureDate).getTime() >= ToDate.getTime());
    } else {
        console.log("Please enter your destination and departure date!")
        return false;
    }
}

export { checkForInput }
