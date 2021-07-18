var key = "c5977d806189278697c81338ef7cc9fd";
var searchBtn = document.getElementById('btn');
var cityInput = document.getElementById('cityInput');
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + key;
var temperature = document.getElementById('temperature');
var cityHeader = document.getElementById('cityName');
var date = document.getElementById('date');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed')
var uvIndex = document.getElementById('uvIndex')
var weatherImg = document.getElementById('weatherImg')
var uvIndexText = document.getElementById('uvIndexText')

var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityInput + "&units=imperial&appid=" + key;

function getWeather() {
    var cityInput = document.getElementById('cityInput').value.trim()
        .replace(' ', '+');
    var key = 'c5977d806189278697c81338ef7cc9fd';

    if (!cityInput) {
        alert('You need a search input value!');
        return;
    }
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + key;

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&units=imperial&appid=' + key;
    console.log(weatherUrl);
    console.log(forecastUrl);


    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data.name)
            cityHeader.innerText = data.name;
            weatherImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            temperature.innerText = "Temperature: " + data.main.temp;
            humidity.innerText = "Humidity: " + data.main.humidity;
            windSpeed.innerText = "Wind Speed " + data.wind.speed;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&cnt=1";
            console.log(uvUrl);
            fetch(uvUrl)
            .then(res => res.json())
            .then(data => {
                uvIndex.innerText = "UV Index: ";
                uvIndexText.innerText = data[0].value;
                if (data[0].value < 4 ) {
                    uvIndexText.setAttribute("class", "safe")
                }
                else if (data[0].value <= 8 ) {
                    uvIndexText.setAttribute("class", "warning")
                }
                else if (data[0].value > 8 ) {
                    uvIndexText.setAttribute("class", "danger")
                }
            })
    })

        
    

    fetch(forecastUrl)
        .then(res => res.json())
        .then(data => console.log(data))
}

searchBtn.addEventListener('click', getWeather);









fetch('https://api.openweathermap.org/data/2.5/forecast?q=dallas&appid=c5977d806189278697c81338ef7cc9fd')
    .then(res => res.json())
    .then(data => console.log(data))