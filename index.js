//I spend too much time on that homework (like way more than 5 hours so I give up, I understood the code and annotated it so you can see I understood)

// Select date and use current time in inject t in html

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

//function update weather temperature in div span class =temperature

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  // update weather temperature in div span class =humidity

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  // update weather temperature in div span class =wind
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  // update weather temperature in div span class =description
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// function calls API info based on city searched and calls function weather conditions that will update weather accordingly

function searchCity(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//function update name of city search in input id = cityEntry

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//function calls API info based on info from navigator position and launches function to update weather info accordingly

function searchLocation(position) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//function convert to farenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
//function convert to celcius

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

// update automatically date and time

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//action trigger when request submitted via search button

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//action trigger when click on to get weather at current location

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Default city

searchCity("Paris");
