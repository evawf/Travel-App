let checkForInput = () => {
    console.log("coucou");
    const destination = document.getElementById('destination').value;
    const inputDate = document.getElementById('Dday').value;
    console.log(destination);
    if(destination !== "" && inputDate !== ""){
        const ToDate = new Date();
        return (new Date(inputDate).getTime() >= ToDate.getTime());
    } else {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.innerHTML = "Please enter your destination and departure date!";
    }
}

export { checkForInput }
