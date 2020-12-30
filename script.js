// var searchCityEl = $("#searchCity").val();

var previousSearches = [];
var latestSearch = localStorage.getItem("city");

if (latestSearch != null) {
  searchCityEl = latestSearch
  weather(searchCityEl);
}


$("#submit").click(function (e) {
  e.preventDefault();

  $("#weatherInfo").empty();
  $("#fiveDayInfo").empty();
  var searchCityEl = $("#searchCity").val();
  $("#searchCity").val("");

  weather(searchCityEl);

});


function weather(searchCityEl) {


  // Set Local Storage
  localStorage.setItem("city", searchCityEl)




  var apiKey = "7fe5794b7606c9e504476c77a7789caa";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCityEl + "&units=imperial&appid=" + apiKey;



  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "jsonp",
  }).then(function (response) {




    console.log(response)





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

      console.log(uvIndex)

      var indexValue = $("<span>" + index.value + "</span>")

      console.log(indexValue)





      if (index.value < 3) {
        $(indexValue).addClass("uvLow");

      } else if (index.value >= 3 && index.value <= 5) {

        $(indexValue).addClass("uvModerate");

      } else if (index.value >= 6 && index.value <= 7) {

        $(indexValue).addClass("uvModerateHigh");


      } else if (index.value >= 8 && index.value <= 10) {

        $(indexValue).addClass("uvHigh");


      } else if (index.value > 10) {

        $(indexValue).addClass("uvExtreme");
      }


      console.log(indexValue)

      $(uvIndex).append(indexValue);






      $(windSpeed).append(uvIndex)










    }); //end of UV


    var fiveDayForcast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + apiKey;

    $.ajax({
      url: fiveDayForcast,
      method: "GET",
    }).then(function (fiveDay) {
      {

        console.log(fiveDay)

        for (var i = 0; i < 6; i++) {

          var day = dayjs().date();
          var indivDay = (day + i + 1);
          var month = dayjs().format("MM");

          // Attributes for 5 day Forcast

          var fiveDayDiv = $("<div class=card ></div>");

          var dayMonth = $("<p>" + month + "/" + indivDay + "</p>");
          var tempHigh = $("<p>" + fiveDay.daily[i].temp.max + " °F" + "</p>");
          var tempLow = $("<p>" + fiveDay.daily[i].temp.min + " °F" + "</p>");
          var fiveHumidity = $("<p>" + fiveDay.daily[i].humidity + " %" + "</p>");
          var fiveDayImage = $('<img src= "https://openweathermap.org/img/wn/' + fiveDay.daily[i].weather[0].icon + '@2x.png" alt ="weatherIcon">');



          $(fiveDayDiv).append(dayMonth, fiveDayImage, tempHigh, tempLow, fiveHumidity);



          $("#fiveDayInfo").append(fiveDayDiv);




        }




      }



    }); //End of 5 day forcast





  }); //AJAX original




  // stop repeat of cities
  if (!previousSearches.includes(searchCityEl)) {

    previousSearchedCities(searchCityEl);
  };

  //push storage to HTML
  previousSearches.push(searchCityEl)

} //End of Weather Function









// Local Storage



function previousSearchedCities(searchCityEl){

  var list = $("<ul>");
  var citylist = $("<button>");
  $(citylist).attr("class", "cityButton")

  $(citylist).text(searchCityEl);
  $(list).appendTo("#searchedCities");
  $(citylist).appendTo(list)

};


//When previous Search clicked event listener

$(document).on("click", ".cityButton", function (e){
  e.preventDefault();
  searchCityEl = $(e.target).text();

  weather();



});