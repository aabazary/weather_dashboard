var key = "c5977d806189278697c81338ef7cc9fd";
var searchBtn = document.getElementById('btn');
var cityName = document.getElementById('city-name');
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + key;

var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName + "&units=imperial&appid=" + key;

function getWeather() {
    var cityName = document.getElementById('city-name').value.trim()
    .replace(' ', '+');
    var key = 'c5977d806189278697c81338ef7cc9fd';

    if (!cityName) {
        alert('You need a search input value!');
        return;
    } 
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + key;

    var forecastUrl =
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
        cityName +
        '&units=imperial&appid=' +
        key;
    console.log(weatherUrl);
    console.log(forecastUrl);

    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => console.log(data))

    fetch(forecastUrl)
    .then(res => res.json())
    .then(data => console.log(data))
}


searchBtn.addEventListener('click', getWeather);









fetch('https://api.openweathermap.org/data/2.5/forecast?q=dallas&appid=c5977d806189278697c81338ef7cc9fd')
    .then(res => res.json())
    .then(data => console.log(data))