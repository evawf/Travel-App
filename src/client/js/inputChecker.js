let checkForInput = (destination, departureDate) => {
    if(destination !== "" && departureDate !== ""){
        const ToDate = new Date();
        return (new Date(departureDate).getTime() >= ToDate.getTime());
    } else {
        return false;
    }
}

export { checkForInput }
