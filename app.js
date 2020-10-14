//// API keys ////
const nasaApiKey = 'gzN2hjFJgD6G6XZwz9WvpCmSNctEOVvP30vrp3zj';
const openApiKey = '6ab109b556728e98f5218756e57e51df';
//// DATA COLLECTION

function getWeather(cityZip) {
  fetch(`https://api.nasa.gov/insight_weather/?api_key=${nasaApiKey}&feedtype=json&ver=1.0`)
    .then(response => response.json())
    .then(nasaData => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${cityZip}&appid=${openApiKey}&units=imperial`)
        .then(response2 => response2.json())
        .then(openData => {
          console.log(nasaData, openData)
          displayWeather(nasaData, openData)
        })
        .catch(err => alert("Something went wrong! try again with a valid zip code"));
    })
    .catch(err => alert("Something went wrong! I can't seem to connect to the Nasa api. Try again with valid zip code"));
}
//// Template Functions ////

function weatherTemplate(marsWeather, marsWeatherConvert, earthWeather, cityZip) {
  //console.log("this worked");
  return `
  <h1 class="weather">It is ${marsWeather}&#8451; or ${marsWeatherConvert}&#8457; on Mars 
  and<br>it is ${earthWeather}&#8457; in ${cityZip}</h1><br>
  <p class="weather">That was pretty neat. want to try again?</p><br>
<button type="button" id="refresh" class="button1 item">Refresh page</button>
  `
}
//// Render functions ////
function displayWeather(nasaData, openData,) {
  let cityZip = $('#js-search-term').val();
  let marsWeatherConvert = Math.trunc(nasaData[667].AT.av * 9 / 5 + 32);
  //let earthWeatherConvert = Math.trunc(openData.main.temp) * 9 / 5 + 32;
  let marsWeather = Math.trunc(nasaData[667].AT.av);
  let earthWeather = openData.main.temp;
  console.log(earthWeather);
  //console.log(openData.main.temp);
  $('.mars-weather').html(weatherTemplate(marsWeatherConvert, marsWeather, earthWeather, cityZip));
refreshPage();
}

//// Event Handlers ////
function watchForm(openData) {
  $('#js-submit').submit(event => {
    event.preventDefault();
    const cityZip = $('#js-search-term').val();
    getWeather(cityZip);
    $('.js-search-term').val("");
  });
  
}

function refreshPage() {
  $('#refresh').click(e => {
    event.preventDefault();
    //console.log("this worked too");
    window.location.reload();
  })
}


function renderPage() {
  watchForm();
  refreshPage();
  
}

$(renderPage);
