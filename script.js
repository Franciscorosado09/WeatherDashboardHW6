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
  }).then(function (response) {




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

    var temperature = $("<h5>").text("Temperature: " + response.main.temp + " °F");

    // Humidity

    var humidity = $("<h5>").text("Humidity: " + response.main.humidity + " %");

    // Wind Speed

    var windSpeed = $("<h5>").text("Wind Speed: " + response.wind.speed + " mph");









    $("#weatherInfo").append(cityName, weatherImage, temperature, humidity, windSpeed);


    // UV Index
    var longitude = response.coord.lon;
    var latitude = response.coord.lat;

    var uvQuery = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

    $.ajax({
      url: uvQuery,
      method: "GET"
    }).then(function (index) {

      var uvIndex = $("<p> UV Index: </p>")

    console.log (uvIndex)

      var indexValue = $( "<span>" + index.value + "</span>")

      console.log (indexValue)

      // $(uvIndex).append(indexValue);

      


      if (index.value < 3) { 
        $(indexValue).addClass("uvLow");
        
      } else if (index.value >= 3 && index.value <= 5) { 

        $(indexValue).addClass("uvModerate");
        
      } else if (index.value >= 6 && index.value <= 7) { 

        $(indexValue).addClass("uvModerateHigh");


      } else if (index.value >= 8 && index.value <= 10) { 

        $(indexValue).addClass("uvHigh");


      } else  if (index.value > 10) { 

        $(indexValue).addClass("uvExtreme");
      }


      console.log (indexValue)

      $(uvIndex).append(indexValue);






      $(windSpeed).append(uvIndex)


      



     



    });


    

  })






})