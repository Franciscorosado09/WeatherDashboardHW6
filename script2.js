
var searchCityEl = $("#searchCity").val();
var apiKey = "7fe5794b7606c9e504476c77a7789caa";


$("#searchCity").click(function (e) { 
    e.preventDefault();
    // var searchCityEl = $("#searchCity").val();
    // var apiKey = "7fe5794b7606c9e504476c77a7789caa";

    console.log(searchCityEl)

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCityEl + "&units=imperial&appid=" + apiKey;

    $.ajax({
        
        url: queryURL,
        method: "GET",
        
        
    }).then(function(response){

        

        console.log(response)









    });






    
});