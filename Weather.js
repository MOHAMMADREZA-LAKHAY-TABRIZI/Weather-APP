const apiKey = 'cc28b63a7f7d2340f4e7ff708cd45b87';
let lat;
let lon;
const cty = 'Country : ';
const situ = 'Situation : ';
let desc;
const temp = 'Temperature : ';
const wisp = 'Wind Speed :';

function responseTraversal(response) {

    for (const item of response) {

        lat = item.lat;
        lon = item.lon;

    }
    // console.log('responseTraversal :2 =>3');

}

function createHTMLElement(response) {

    for (const item of response.weather) {
        desc = item.description;
    }
    let infoBlock = document.getElementById('info');

    let country = document.createElement("h2");
    country.innerText = cty.concat(response.sys.country);
    infoBlock.appendChild(country);


    infoBlock.appendChild(document.createElement('br'));

    let Situation = document.createElement("h2");
    Situation.innerText = situ.concat(desc);
    infoBlock.appendChild(Situation);

    infoBlock.appendChild(document.createElement('br'));

    let celcius = (response.main.temp - 273.15);
    let temperature = document.createElement("h2");
    temperature.innerText = temp.concat(celcius);
    infoBlock.appendChild(temperature);

    infoBlock.appendChild(document.createElement('br'));

    let windSpeed = document.createElement("h2");
    windSpeed.innerText = wisp.concat(response.wind.speed);
    infoBlock.appendChild(windSpeed);

    infoBlock.appendChild(document.createElement('br'));

}

function callSecoundAPI() {

    const addres = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    console.log('callSecoundAPI :1');
    fetch(addres).
    then((cityTempString) => cityTempString.json()).
    then((cityTempJSON) => createHTMLElement(cityTempJSON));
    console.log('callSecoundAPI fetch :2');
}

const callFirstAPI = () => {


    const city = document.getElementById("city").value;
    if (city != '') {

        const addres = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
        fetch(addres).
        then((geoResponseString) => geoResponseString.json()).
        then((geoResponseJSON) => responseTraversal(geoResponseJSON));


    }
    setTimeout(() => {

        callSecoundAPI();
    }, 3000);

}