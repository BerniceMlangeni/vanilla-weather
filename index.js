function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");


     iconElement.innerHTML= ` <img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
    timeElement.innerHTML =formatdate(date);
    temperatureElement.innerHTML = temperature;

    getForecast(response.data.city);
}

function formatdate(date){
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
   let apiKey = "3306f63ec6f9ff40caatc279bf4291fo";
   let apiUrl =  `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
   axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function displayForecast(response){
    console.log(response.data);
    
let forecastHTML = "";

response.data.daily.forEach(function (day, index) {
    if (index < 5) {

   
    forecastHTML = forecastHTML + `
 <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div> 
                <img class="weather-forecast-icon" src="${day.condition.icon_url}"</div>
                <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong> </div>
                    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                    </div>
           </div>
 `;
  }
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHTML;

}

function getForecast(city){
    let apiKey = "3306f63ec6f9ff40caatc279bf4291fo";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
    
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Tzaneen");