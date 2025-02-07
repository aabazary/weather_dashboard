var key = "c5977d806189278697c81338ef7cc9fd";
var searchBtn = document.getElementById('btn');
var cityInput = document.getElementById('cityInput');
var weatherCard = document.querySelector('.weatherCard');
var forecastCards = document.querySelector('.forecastCards');
var searchUl = document.getElementById('searchUl');
var temperature = document.getElementById('temperature');
var cityHeader = document.getElementById('cityName');
var date = document.getElementById('date');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var weatherImg = document.getElementById('weatherImg');
var currentDate = moment().format("MMM Do, YYYY");
var searchHistory = JSON.parse(localStorage.getItem('cityName')) || [];

// Initially hide containers
weatherCard.style.display = "none";
forecastCards.style.display = "none";

// Saving city to local storage
var saveCity = function (city) {
    searchHistory = searchHistory.filter(item => item !== city); // Remove duplicates
    searchHistory.push(city);
    localStorage.setItem('cityName', JSON.stringify(searchHistory));
    historyCity();
}

// Function to create weather card
function getWeather(city) {
    city = city.trim().replace(' ', '+');
    if (!city) return;

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    
    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var uvUrl = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${key}&cnt=1`;

            saveCity(data.name);
            cityHeader.innerText = `${data.name} (${currentDate})`;
            weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            temperature.innerText = `Temperature: ${data.main.temp}°F`;
            humidity.innerText = `Humidity: ${data.main.humidity}%`;
            windSpeed.innerText = `Wind Speed: ${data.wind.speed} MPH`;

            fetch(uvUrl)
                .then(res => res.json())
                .then(data => {
                    uvIndex.innerText = "UV Index: ";
                    var newSpan = document.createElement('span');
                    newSpan.innerText = data[0].value;
                    uvIndex.appendChild(newSpan);
                    newSpan.className = data[0].value < 4 ? "safe" : data[0].value <= 8 ? "warning" : "danger";
                });

            // Show the weather container
            weatherCard.style.display = "block";
        });
}

// Function to get 5-day forecast
function getForecast(city) {
    city = city.trim().replace(' ', '+');
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;

    fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
            var forecastElements = document.querySelectorAll('.forecast');
            forecastElements.forEach((element, i) => {
                element.innerHTML = "";
                var forecastIndex = i * 8 + 4;
                element.innerHTML = `
                    <p>Date: ${moment(data.list[forecastIndex].dt_txt).format("MMM Do, YYYY")}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[forecastIndex].weather[0].icon}@2x.png">
                    <p>Temp: ${data.list[forecastIndex].main.temp}°F</p>
                    <p>Humidity: ${data.list[forecastIndex].main.humidity}%</p>
                    <p>Wind: ${data.list[forecastIndex].wind.speed} MPH</p>
                `;
            });

            // Show the forecast container
            forecastCards.style.display = "flex";
        });
}


// Function to update search history display
function historyCity() {
    var searchUl = document.getElementById('searchUl');
    var clearHistory = document.getElementById('clearHistory');

    searchUl.innerHTML = '';

    searchHistory = JSON.parse(localStorage.getItem('cityName')) || [];

    if (searchHistory.length === 0) {
        searchUl.style.display = 'none';
        clearHistory.style.display = "none";
        return;
    }

    searchHistory.sort();

    searchUl.style.display = 'block';
    clearHistory.style.display = "block";

    searchHistory.forEach(city => {
        var button = document.createElement('button');
        button.innerText = city;
        button.classList.add("history-btn");
        button.addEventListener('click', function () {
            getWeather(city);
            getForecast(city); 
        });
        searchUl.appendChild(button);
    });
}


// Function to clear search history
document.getElementById('clearHistory').addEventListener('click', function () {
    localStorage.removeItem('cityName');
    searchHistory = [];
    historyCity(); 
    location.reload()
});


// Event listener for search button
searchBtn.addEventListener("click", function () {
    var city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        getForecast(city);
        cityInput.value = ""; 
    }
});


historyCity();
