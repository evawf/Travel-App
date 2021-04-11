const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

// function init() {
//     destination.reload(1)
// }

//PreLoader Handler
// const preloader = document.getElementById('loader');
// const resultsDiv = document.getElementById('results');
// function showPreLoader(){
//     preloader.style.display = 'block';
//     resultsDiv.style.display = 'none';
// }
// function hidePreLoader(){
//     preloader.style.display = 'none';
//     resultsDiv.style.display = 'block';
// }

// Post Form Input
async function handleSubmit(event) {
    event.preventDefault();
    const destination = document.getElementById('destination').value;
    console.log(destination);
    // const errorMsg = document.getElementById('errorMsg');
    if(Client.checkForInput()) {
        // showPreLoader();
        const data = await postData('http://localhost:8081/destination', { destination });
        console.log(data);
        // displayResults(data);
    } else {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.innerHTML = "Please enter a valid location/city!";
        // errorMsg.style.color = "red";
        // setTimeout(init, 3000);
    }
}


//Display Trip Planning
// const displayResults = (data) => {

// }

export { handleSubmit }
