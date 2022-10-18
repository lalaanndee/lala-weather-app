let now = new Date();
let h3 = document.querySelector("h3");
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
h3.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.weather[0].icon
            }.png" alt="" width="36" />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
            </div>
            </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "629340f426964bddabao29a02d5038tc";
  let apiUrl = `https://api.shecodes.io/v1/weather/forecast?query=${city}&key=629340f426964bddabao29a02d5038tc&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector(".place").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector(".humid").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".descript").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "629340f426964bddabao29a02d5038tc";
  let apiUrl = `https://api.shecodes.io/v1/weather/current?query=${position.coords.latitude}&lon=${position.coords.longitude}&key=629340f426964bddabao29a02d5038tc&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function searchCity(city) {
  let apiKey = "629340f426964bddabao29a02d5038tc";
  let apiUrl = `https://api.shecodes.io/v1/weather/current?query=${city}&key=629340f426964bddabao29a02d5038tc&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Queens");
