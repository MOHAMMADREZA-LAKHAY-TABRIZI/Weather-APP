const apiKey = 'cc28b63a7f7d2340f4e7ff708cd45b87';
let lat;
let lon;

function responseTraversal(response) {

    for (const item of response) {

        lat = item.lat;
        lon = item.lon;
        console.log(item);

    }
}

function responseTraversal1(response) {
    for (const item of response) {
        console.log(item);
    }
}

function callSecoundAPI() {

    const addres = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(addres).
    then((cityTempString) => cityTempString.json()).
    then((cityTempJSON) => responseTraversal1(cityTempJSON));
}

const callFirstAPI = () => {

    const city = document.getElementById("city").value;
    if (city != '') {

        const addres = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
        fetch(addres).
        then((geoResponseString) => geoResponseString.json()).
        then((geoResponseJSON) => responseTraversal(geoResponseJSON));

    }
    callSecoundAPI();
}