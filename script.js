//constant variables
 const apiKey = "6b8e9a03868aa6b59b31dc84696dc422";
//all functions

function uvIndex (uvInd) {
    //let uvIndex = response.current.uvi;
    console.log(uvInd);
    
    if (uvInd < 7) {
        $('#uv-index').addClass('low');
    }
    else  {
        $('#uv-index').addClass('high');
    }

}

function get5days(lat, lon) {
    //console.log(lat, lon);
    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${apiKey}
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`,
        method: "GET"
    }).then(function (response) {
        for (let i = 1; i < 6; i++) {
            console.log(response.daily[i])
            let unix_timestamp = response.daily[i].dt
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix_timestamp * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();
    
            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            console.log(moment(date).format("MMM Do YY"));
            //step 1 create an element
            var fiveDayDiv = $('<div>')
            //step 2 add info to it
            fiveDayDiv.attr('class', 'blueDiv col-3 ml-1')
            //s.1 and s.2 combined:
            var dateTag =  $('<h3>').text(moment(date).format("MMM Do"))
            //s.3 append on the page
            fiveDayDiv.append(dateTag)
            /*
            add more elements to fiveDayDiv
            */
           //step 3 append to a page
            $('#fiveDay').append(fiveDayDiv)
        }
        
    });
}

function weatherSearch(areaSearch) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${areaSearch},us&appid=6b8e9a03868aa6b59b31dc84696dc422&units=imperial`,
        method: "GET"
    }).then(function (response) {
        var lat = response.coord.lat
        var lon = response.coord.lon
        $('.cityName').text(response.name);
        $('.temp').text(`Temperature: ${response.main.temp}`);
        $('.humidity').text(`Humidity:  ${response.main.humidity}`);
        $('.wind-speed').text(`Wind Speed: ${response.wind.speed}`);
        get5days(lat, lon)

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var uvInd = response.current.uvi;
            $('#uv-index').text(uvInd) //.text(`UV Index: ${uvInd}`);
            uvIndex(uvInd)
        });
    });

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