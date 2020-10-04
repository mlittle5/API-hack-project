//// API keys ////
const nasaApiKey = 'gzN2hjFJgD6G6XZwz9WvpCmSNctEOVvP30vrp3zj';
const openApiKey = '6ab109b556728e98f5218756e57e51df';
//// DATA COLLECTION

function getWeather(cityZip) {
  fetch(`https://api.nasa.gov/insight_weather/?api_key=${nasaApiKey}&feedtype=json&ver=1.0`)
    .then(response => response.json())
    .then(nasaData => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${cityZip}&appid=${openApiKey}&units=metric`)
        .then(response2 => response2.json())
        .then(openData => {
          console.log(nasaData, openData)
          displayWeather(nasaData, openData)
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}
//// Template Functions ////

function weatherTemplate(marsWeather, marsWeatherConvert, earthWeather, earthWeatherConvert, cityZip) {
  console.log("this worked");
  return `
  <h1 class="weather">It is ${marsWeather}&#8451; or ${marsWeatherConvert}&#8457; on Mars 
  and<br>it is ${earthWeather}&#8451; or ${earthWeatherConvert}&#8457; in ${cityZip}</h1>
  `
}

function hotTemplate() {
  return `
<h2> Wow, its hot on mars!</h2>
`
}
function earthWeatherConvert() {

}

//// Render functions ////
function displayWeather(nasaData, openData,) {
  let cityZip = $('#js-search-term').val();
  let marsWeatherConvert = Math.trunc(nasaData[657].AT.av) * 9 / 5 + 32;
  let earthWeatherConvert = Math.trunc(openData.main.temp) * 9 / 5 + 32;
  let marsWeather = nasaData[656].AT.av;
  let earthWeather = openData.main.temp;
  $('.mars-weather').html(weatherTemplate(marsWeatherConvert, earthWeatherConvert, marsWeather, earthWeather, cityZip));
  // if (marsWeatherConvert > 80) {
  //   $('#mars-weather').html(hotTemplate());
  // }

}


// function displayMarsWeather(nasaData) {
//   let farenheit = Math.trunc(nasaData[650].AT.av) * 9 / 5 + 32;
//$('#mars-weather').html(`<h1 class="button1">It is ${nasaData[656].AT.av}&#8451; or ${farenheit}&#8457; on Mars</h1><br><button type="button" id="more-info" class="button1">More information</button>`);
// $('.mars-weather').fadeIn("slow", function () {
//complete
//});

//   watchMoreInfo();
// }
// function displayEarthWeather(openData) {
//   let cityZip = $('#js-search-term').val();
//   let farenheit = Math.trunc(openData.main.temp) * 9 / 5 + 32;
//   console.log(openData);
//openWeatherData.push(`<p>${openData.main.temp}</p>`);
//   $('#earth-weather').html(`<h1 class="button1">It is ${Math.trunc(openData.main.temp)}&#8451; or ${farenheit}&#8457; in ${cityZip}</h1>`);
//   $('.earth-weather').fadeIn("slow", function () {
//complete
//   });
// }
// function displayMoreData() {
//   $('.more-data').html(`<div><p class="button1">This weather data is provided by the InSight: Mars Weather Service API</p>
//   <br>
//   <p class="button1"> To learn more, click <a target="_blank" href="https://api.nasa.gov/">here</a></p>
//   </div>`);

// }
//// Event Handlers ////
function watchForm(openData) {
  $('#js-submit').submit(event => {
    event.preventDefault();
    const cityZip = $('#js-search-term').val();
    getWeather(cityZip);
  });
}
// function watchMarsButton() {
//   $('#mars-weather-button').click(event => {
//     event.preventDefault();
//     getMarsWeather();
//   })
// }

function watchMoreInfo() {
  $('#more-info').click(event => {
    console.log('logged');
    event.preventDefault();
    displayMoreData();
  })
}

function refreshPage() {
  //TODO make a thing to refresh the page
}


function renderPage() {
  //console.log('App loaded! Waiting for submit!');
  watchForm();
  //watchMarsButton();
  //watchMoreInfo();
}

$(renderPage);
