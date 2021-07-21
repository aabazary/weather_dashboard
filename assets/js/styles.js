//list of variables
var key = "c5977d806189278697c81338ef7cc9fd";
var searchBtn = document.getElementById('btn');
var cityInput = document.getElementById('cityInput');
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + key;
var temperature = document.getElementById('temperature');
var cityHeader = document.getElementById('cityName');
var date = document.getElementById('date');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var weatherImg = document.getElementById('weatherImg');
var currentDate = moment().format("MMM Do, YYYY");
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityInput + "&units=imperial&appid=" + key;

//saving city to local storage
var saveCity = function (city) {

    for (var i = 0; i < searchHistory.length; i++) {
        if (city === searchHistory[i]) {
            searchHistory.splice(i, 1);
            console.log("inside for loop")
        }
    }
    searchHistory.push(city);
    localStorage.setItem('cityName', JSON.stringify(searchHistory));
    console.log(searchHistory)
    historyCity();
}
//function to create weather card
function getWeather(city) {
    console.log("city", city)
    city = city.trim().replace(' ', '+');
    var key = 'c5977d806189278697c81338ef7cc9fd';

    if (!city) {
        alert('You need a search input valuadsfasdfasfasdfe!');
        
        return;
    }
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + key;

    console.log(forecastUrl);
    
    getForecast(city);
    
//api looking up weather url and creating the weather url card from the json
    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&cnt=1";
            var weatherCard = document.querySelector('.weatherCard');
            var city = data.name;
            saveCity(city);
            cityHeader.innerText = city + "(" + currentDate + ")";
            weatherImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            console.log(data.weather[0].icon)
            weatherCard.setAttribute('class', "weatherCard bg-primary text-white ml-3 mb-3 rounded")
            temperature.innerText = "Temperature: " + data.main.temp + "°F";
            humidity.innerText = "Humidity: " + data.main.humidity + "%";
            windSpeed.innerText = "Wind Speed " + data.wind.speed + "MPH";
//creating a uv append and adding a background color and fit content with css
            fetch(uvUrl)
                .then(res => res.json())
                .then(data => {
                    uvIndex.innerText = "UV Index: ";
                    var newSpan = document.createElement('span')
                    newSpan.innerText = data[0].value;
                    uvIndex.append(newSpan)
                    if (data[0].value < 4) {
                        newSpan.setAttribute("class", "safe")
                    } else if (data[0].value <= 8) {
                        newSpan.setAttribute("class", "warning")
                    } else if (data[0].value > 8) {
                        newSpan.setAttribute("class", "danger")
                    }
                })
        })
}
//function to get 5 day forecast
function getForecast(city) {
    city = city.trim().replace(' ', '+');
    var key = 'c5977d806189278697c81338ef7cc9fd';
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + key;
    console.log(forecastUrl);

//pulling from the API and creating the forecast cards appending the associated attributes into the html
    fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
            var forecastCards = document.querySelectorAll('.forecast')
            for (i = 0; i < 5; i++) {
                forecastCards[i].innerHTML = "";
                var forecastIndex = i * 8 + 4;
                var forecastDate = document.createElement("p");
                var forecastDateFormat = moment(data.list[forecastIndex].dt_txt).format("MMM Do, YYYY")
                forecastDate.innerHTML = "Date: " + forecastDateFormat;
                forecastCards[i].append(forecastDate);


                var forecastWeather = document.createElement("img");
                forecastWeather.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastCards[i].append(forecastWeather);

                var forecastTemp = document.createElement("p");
                forecastTemp.innerHTML = "Temp: " + data.list[forecastIndex].main.temp + "°F";
                forecastCards[i].append(forecastTemp);

                var forecastHumidity = document.createElement("p");
                forecastHumidity.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
                forecastCards[i].append(forecastHumidity);

                var forecastWindSpeed = document.createElement("p");
                forecastWindSpeed.innerHTML = "Wind: " + data.list[forecastIndex].wind.speed + "MPH";
                forecastCards[i].append(forecastWindSpeed);
            }

        })
};

//function to render the search history
function historyCity() {
    searchHistory = JSON.parse(localStorage.getItem('cityName'));

    if (!searchHistory) {
        searchHistory = [];
        return
    }
  console.log("searhc hadf ", searchHistory)
    var ul = document.getElementById('searchUl')
    ul.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        var li = document.createElement('li');

        li.addEventListener('click', function() {
            getWeather(this.textContent)
        })
        li.setAttribute('value', searchHistory[i]);
        li.textContent = searchHistory[i];
        ul.appendChild(li);
        console.log('inside for loop')
        
    }   
    console.log('outside for loop')
}
historyCity();
//function to correct city structure after taking cityinput
function getCity(){
    var cityInput = document.getElementById('cityInput').value.trim()
    .replace(' ', '+');
    getWeather(cityInput)
}
searchBtn.addEventListener('click', getCity);
