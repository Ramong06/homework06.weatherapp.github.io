//all variables
 const apiKey = "6b8e9a03868aa6b59b31dc84696dc422";
 const apiKey2 = '56149c9c2961bc5e9bc85376b22b499b';
 let cityLat = navigator.geolocation;
 let cityLon = navigator.geolocation;
//all functions
function weatherSearch(areaSearch) {
    //let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${areaSearch},us&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${areaSearch},us&appid=6b8e9a03868aa6b59b31dc84696dc422&units=imperial`,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var queryURL =
        $('.cityName').text(response.name);
        $('.temp').text(`Temperature: ${response.main.temp}`);
        $('.humidity').text(`Humidity:  ${response.main.humidity}`);
        $('.wind-speed').text(`Wind Speed: ${response.wind.speed}`);
        //
    });
    //let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude={part}&appid=${apiKey2}`;
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=29.7604&lon=-95.3698&exclude=minutely&appid=6b8e9a03868aa6b59b31dc84696dc422`,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('.uv-index').text(`UV Index: ${response.current.uvi}`); 
        
    // weather search logic here
    });
}
//all on click events below:
$("#searchBtn").click(function(){
    var citySearch = $("#searchQuery").val();
    weatherSearch(citySearch);


});

/* 
$('#history').click(function(){
    var citySearch = $(this).val();
    weatherSearch(citySearch);

})*/