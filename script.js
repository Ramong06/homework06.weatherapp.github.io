//constant variables
 const apiKey = "6b8e9a03868aa6b59b31dc84696dc422";
//all functions
function weatherSearch(areaSearch) {
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
    });
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=29.7604&lon=-95.3698&exclude=minutely&appid=6b8e9a03868aa6b59b31dc84696dc422`,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('.uv-index').text(`UV Index: ${response.current.uvi}`);
    });
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${areaSearch}&cnt=7&appid=56149c9c2961bc5e9bc85376b22b499b`,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    });
}


function uvIndex () {
    let uvIndex = response.current.uvi;
    if (uvIndex < 7) {
        $('#uv-index').addClass('low');
    }
    else  {
        $('#uv-index').addClass('high');
    }

}
//all on click events below:
$("#searchBtn").click(function(){
    var citySearch = $("#searchQuery").val();
    weatherSearch(citySearch);


});

$()

/* 
$('#history').click(function(){
    var citySearch = $(this).val();
    weatherSearch(citySearch);

})*/