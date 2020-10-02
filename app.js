//// API keys ////
const nasaApiKey = 'gzN2hjFJgD6G6XZwz9WvpCmSNctEOVvP30vrp3zj';
const openApiKey = '6ab109b556728e98f5218756e57e51df';
//// DATA COLLECTION
function getMarsWeather() {
  fetch(`https://api.nasa.gov/insight_weather/?api_key=${nasaApiKey}&feedtype=json&ver=1.0`)
    .then(response => response.json())
    .then(nasaData => {
      displayMarsWeather(nasaData);
      //displayMoreData(nasaData);
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
  let farenheit = Math.trunc(nasaData[650].AT.av) * 9 / 5 + 32;
  $('#mars-weather').html(`<h1 class="button1">It is ${nasaData[656].AT.av}&#8451; or ${farenheit}&#8457; on Mars</h1><br><button type="button" id="more-info" class="button1">More information</button>`);
  $('.mars-weather').fadeIn("slow", function() {
    //complete
  });
  renderPage();
}
function displayEarthWeather(openData) {
  let cityZip = $('#js-search-term').val();
  let farenheit = Math.trunc(openData.main.temp) * 9 / 5 + 32;
  console.log(openData);
  //openWeatherData.push(`<p>${openData.main.temp}</p>`);
  $('#earth-weather').html(`<h1 class="button1">It is ${Math.trunc(openData.main.temp)}&#8451; or ${farenheit}&#8457; in ${cityZip}</h1>`);
  $('.earth-weather').fadeIn("slow", function() {
    //complete
  });
  renderPage();
}
function displayMoreData(nasaData){
  //let nasaData =
  $('.more-data').html(`<div><p class="button1">This weather data is provided by the InSight: Mars Weather Service API</p>
  <br>
  <p class="button1"> To learn more, click <a target="_blank" href="https://api.nasa.gov/">here</a></p>
  </div>`);
watchMoreInfo();
}
//// Event Handlers ////
function watchForm(openData) {
  $('#js-submit').submit(event => {
    event.preventDefault();
    const cityZip = $('#js-search-term').val();
    getOpenWeather(cityZip);
  });
}
function watchMarsButton() {
$('#mars-weather-button').click(event => {
  event.preventDefault();
  getMarsWeather();
})
}

function watchRefresh() {

}

function watchMoreInfo(){
  $('#more-info').click(event => {
    console.log('logged');
    event.preventDefault();
    displayMoreData();
  })
}
  
  //TODO make the text appear once and then put a button underneath it? the button is what triggers the second and third round of animation





function renderPage() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  watchMarsButton();
  watchMoreInfo();
}
$(getBackground);
$(renderPage);


  //TODO use some math to calculate mars days