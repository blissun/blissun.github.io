const COORDS = 'coords';
const APIKEY = '0b93dda453d9b578232647d15715a088';
const header = document.getElementsByTagName('header')[0];

let jsons = {};
function setWeather(json) {
  jsons = json;
  const city = json.name;
  const temp = json.main.temp;
  const weather = json.weather[0].description;
  const wind = json.wind;
  header.innerHTML = `◎ ${city}, ${weather}, ${temp}℃, &nbsp;&nbsp;Wind: ${wind.speed}m/s, ${wind.deg}º`;
}

function getWhether(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setWeather(json);
    })
    .catch((err) => {
      console.log(err);
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWhether(latitude, longitude);
}
function handleGeoError(error) {
  console.log("Can't access geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const coords = JSON.parse(loadedCoords);
    getWhether(coords.latitude, coords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
