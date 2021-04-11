let checkForInput = () => {
    const inputDate = document.getElementById('Dday').value;
    const ToDate = new Date();
    console.log(ToDate.getTime());
    return (new Date(inputDate).getTime() <= ToDate.getTime());
}

export { checkForInput }
