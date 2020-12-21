// var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
// var apiKey = "a6876375a644466f6ce5f8373db5ec2b";
// var searchCity = $("#cityName").val();





$("#submit").click(function (e) {
  e.preventDefault();

  

  var searchCityEl = $("#searchCity").val();
  var apiKey = "7fe5794b7606c9e504476c77a7789caa";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCityEl + "&units=imperial&appid=" + apiKey;
 // var apiKey = "7fe5794b7606c9e504476c77a7789caa";

 // var searchCityEl = $("#searchCity").val();


  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {

  

  console.log(response)

  // city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

 // City Name & Date
  var date = dayjs().format(" MM-DD-YYYY")
  var cityName = $("<h1>").text(response.name + date);


 // Icon weather conditions
  var weatherConditionsIcon = response.weather[0].icon;
  var weathericonURL = "http://openweathermap.org/img/wn/" + weatherConditionsIcon + "@2x.png"
  var weatherImage = $("<img src='" + weathericonURL + "'>")


// Temprature

 var temprature = 




  

$("#weatherInfo").append(cityName, weatherImage);


})

  




})