var key = "c5977d806189278697c81338ef7cc9fd";
var searchBtn = $("search-btn");
var searchVal= $("form-control");
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ searchVal + "&units=imperial&appid=" + key ;

var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
searchVal + "&units=imperial&appid=" + key ;



console.log(weatherUrl)
console.log(forecastUrl)

