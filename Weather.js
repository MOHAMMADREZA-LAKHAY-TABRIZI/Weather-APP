const apiKey = 'cc28b63a7f7d2340f4e7ff708cd45b87';
// let lat;
// let lon;
const cty = 'Country : ';
const situ = 'Situation : ';
let desc;
const temp = 'Temperature : ';
const wisp = 'Wind Speed :';

function responseTraversal(response) {
    let geo;
    let lat;
    let lon;
    for (const item of response) {

        // geo = item.lat + '-' + item.lon;
        lat = item.lat;
        lon = item.lon;

    }
    geo = { 'lat': lat, 'lon': lon };
    return geo;
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

function callSecoundAPI(geoInputString) {

    let lat;
    let lon;
    // const geoPos = geoInputString.split('-');
    // lat = geoPos[0];
    // lon = geoPos[1];
    lat = parseFloat(geoInputString.lat);
    lon = parseFloat(geoInputString.lon);
    console.log(`lat:${lat}`);
    console.log(`lon:${lon}`);
    const addres = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(addres).
    then((cityTempString) => cityTempString.json()).
    then((cityTempJSON) => createHTMLElement(cityTempJSON));

}


const callFirstAPI = () => {
    let geo;

    const city = document.getElementById("city").value;

    var promise = new Promise(function(resolve, reject) {
        if (city != '') {

            const addres = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
            fetch(addres).
            then((geoResponseString) => geoResponseString.json()).
            then((geoResponseJSON) => {
                debugger;

                geo = responseTraversal(geoResponseJSON);
                console.log(geo);
            });

            resolve(geo);


        } else {
            reject();
        }
    });

    promise.then(function(geoInput) {
        console.log('resolve');
        callSecoundAPI(geoInput);
    }).catch(function() {
        console.log('Some error has occurred');
    });

}
