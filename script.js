//all variables
 const apiKey = "6b8e9a03868aa6b59b31dc84696dc422"
//all functions
function weatherSearch(areaSearch) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${areaSearch},us&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var queryURL =
        console.log(response);
        //step 1 - create element
        let tempEl = $('<p>');
        let humidEl = $('<p>');
        let windSpeed = $('<p>');
        let uvIndex = $('<p>');
        //step 2 - giving this attribute its values, text contentent, atrributes..
        tempEl.text(`Temperature:  ${response.main.temp}`);
        humidEl.text(`Humidity:  ${response.main.humidity}`);
        windSpeed = (`Wind Speed: ${response.wind.speed}`);
        //uvIndex = (`UV Index:  ${response.wind.speed}`);
        //step 3 - render it on the page
        $('#oneDay').append(tempEl);
        $('#oneDay').append(humidEl);
        $('#oneDay').append(windSpeed);
    })
    // weather search logic here
}

//all on click events below:
$("#searchBtn").click(function(){
    var citySearch = $("#searchQueery").val();
    weatherSearch(citySearch);

});

/* 
$('#history').click(function(){
    var citySearch = $(this).val();
    weatherSearch(citySearch);

})
*/
