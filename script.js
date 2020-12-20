// var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
// var apiKey = "a6876375a644466f6ce5f8373db5ec2b";
// var searchCity = $("#cityName").val();


$("#submit").click(function (e) {
    e.preventDefault();
    

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCityEl + "&units=imperial&appid=" + apiKey;
    var apiKey = "a6876375a644466f6ce5f8373db5ec2b";
    var searchCityEl = $("#searchCity").val();






    $.ajax({

        url: queryURL,
        method: "GET",
        
    });
        console.log(searchCityEl)
    
        console.log(response)


    






});