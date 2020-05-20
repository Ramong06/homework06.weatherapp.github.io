//constant variables
 const apiKey = "6b8e9a03868aa6b59b31dc84696dc422";
 const apiKey2 = "56149c9c2961bc5e9bc85376b22b499b";
 const citiesArray = [];
//all functions

function weatherSearch(areaSearch) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${areaSearch},us&appid=6b8e9a03868aa6b59b31dc84696dc422&units=imperial`,
        method: "GET"
    }).then(function (response) {
        var lat = response.coord.lat
        var lon = response.coord.lon
        var city = response.name;
        $('.cityName').text(response.name);
        $('.temp').text(`Temperature: ${response.main.temp}`);
        $('.humidity').text(`Humidity:  ${response.main.humidity}`);
        $('.wind-speed').text(`Wind Speed: ${response.wind.speed}`);
        $('.historyEl').prepend('<li>' + '<button>' + city);
        get5days(lat, lon)

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var uvInd = response.current.uvi;
            $('#uv-index').text(`UV-Index:  ${uvInd}`);
            uvIndex(uvInd);
        });
    });

}

function uvIndex (uvInd) {
    if (uvInd < 7) {
        $('#uv-index').addClass('low');
    }
    else  {
        $('#uv-index').addClass('high');
    }

}

function get5days(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`,
        method: "GET"
    }).then(function (response) {
        for (let i = 1; i < 6; i++) {
            console.log(response.daily[i])
            let unix_timestamp = response.daily[i].dt
            var date = new Date(unix_timestamp * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.
            substr(-2);
            //element
            var fiveDayWeatherDiv = $('<div>');
            var fiveDayTemp = $('<p>');
            var dayWeather = response.daily[i].weather[0].main;
            var dayTemp = response.daily[i].temp.day;
            fiveDayWeatherDiv.attr("class", "blueDiv col-2 ml-1");
            var dateTag =  $('<h5>').text(moment(date).format("MMM Do"));
            //append on the page
            fiveDayWeatherDiv.append(dateTag);
            $('#fiveDay').append(fiveDayWeatherDiv);
            $(fiveDayWeatherDiv).append(dayWeather);
            $(fiveDayTemp).append(dayTemp);
            $(fiveDayWeatherDiv).append(fiveDayTemp); 
        }
        
    })
};

//all on click events below:
$("#searchBtn").click(function(){
    var citySearch = $("#searchQuery").val().trim();
    weatherSearch(citySearch);
});
