//// API keys ////
const nasaApiKey = 'gzN2hjFJgD6G6XZwz9WvpCmSNctEOVvP30vrp3zj';
const openApiKey = '6ab109b556728e98f5218756e57e51df';
//// DATA COLLECTION
function getMarsWeather() {
  fetch(`https://api.nasa.gov/insight_weather/?api_key=${nasaApiKey}&feedtype=json&ver=1.0`)
    .then(response => response.json())
    .then(nasaData => {
      displayMarsWeather(nasaData);
    })
    .catch(err => console.error(err));
}

function getOpenWeather(cityZip) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${cityZip}&appid=${openApiKey}&units=metric`)
    .then(response2 => response2.json())
    .then(openData => {
      displayEarthWeather(openData)
    })
    .catch(err => console.error(err));
}

function getBackground() {
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaApiKey}`
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let goodPhotos = data.photos.filter(photo => {
        if (photo.camera.name === "NAVCAM") {
          return true;
        }
        return false;
      });
      let imgSrc = goodPhotos[Math.floor(Math.random() * goodPhotos.length)].img_src;
      $('body').css("background-image", `url("${imgSrc}")`);
      // Do stuff with data (this is the JSON from the response body)
    })
    .catch(err => console.error(err));
}
//// Render functions ////
function displayMarsWeather(nasaData) {
  let weatherData = [];
  weatherData.push(`<h1>${nasaData[650].AT.av}</h1>`);
  $('#mars-weather').html(weatherData);

}
function displayEarthWeather(openData) {
  let farenheit = Math.trunc(openData.main.temp) * 9 / 5 + 32;
  console.log(openData);
  //openWeatherData.push(`<p>${openData.main.temp}</p>`);
  $('#earth-weather').html(`<h1>${Math.trunc(openData.main.temp)}&#8451; or ${farenheit}&#8457;</h1>`);
  $('.earth-weather').fadeIn("slow", function() {
    //complete
  });
  
  
  //$('.text-bottom').addClass("asdf");
  //  $( "#clickme" ).click(function() {
}
//// Event Handlers ////
function watchForm(openData) {
  $('#js-submit').submit(event => {
    event.preventDefault();
    const cityZip = $('#js-search-term').val();
    getOpenWeather(cityZip);
  });
  
  //TODO make the text appear once and then put a button underneath it? the button is what triggers the second and third round of animation
}





$(function () {
  console.log('App loaded! Waiting for submit!');
  getBackground();
  watchForm();
  getMarsWeather();
});


  //TODO use some math to calculate mars days