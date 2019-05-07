const searchInput = document.querySelector('.areaInput');
const submitBtn = document.querySelector('.submitBtn');
//UI we need to update
const areaText = document.querySelector('#areaText');
const tempText = document.querySelector('#tempText');
const typeText = document.querySelector('#typeText');
const highText = document.querySelector('#highText');
const lowText = document.querySelector('#lowText');
const windText = document.querySelector('#windText');
const pressureText = document.querySelector('#pressureText');
const mainImg = document.querySelector('#mainImg');

//OPEN WEATHER API ID HERE
var APP_ID = '';


window.addEventListener('load', () => {
    getWeather('Dubai');
});


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
});

function getWeather(area) {
    console.log('leggo');
    
    const proxy = 'https://cors-anywhere.herokuapp.com/'; 
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${area}&APPID=${APP_ID}&units=imperial`;
    
    fetch(api).then(response => {
        return response.json();
    }).then(data => {
        const {temp, pressure, temp_max, temp_min} = data.main;
        const {main} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        setUI(name, temp, main, temp_max, temp_min, speed, pressure);
    }).catch((e)=> {
        alert('Unfortunately there was an error. Try another area or check your internet connection');
    });
}


function setUI(city, temp, main, temp_max, temp_min, speed, pressure) {
    areaText.textContent = city;
    tempText.textContent = `${temp} •F`;
    typeText.textContent = main;
    highText.textContent = `${temp_max} •F`;
    lowText.textContent = `${temp_min} •F`;
    windText.textContent = `${speed} mph`;
    pressureText.textContent = `${pressure}`;
    var img = pictureWeatherMap[main];
    mainImg.src = `assets/${img}.png`;
}






const pictureWeatherMap = {
    Rain: 'rainy',
    Drizzle: 'rainy',
    Clear: 'sunny',
    Snow: 'snowman',
    Mist: 'cloudy',
    Smoke: 'cloudy',
    Haze: 'cloudy',
    Dust: 'cloudy',
    Fog: 'cloudy',
    Sand: 'sunny',
    Ash: 'cloudy',
    Squal: 'cloudy',
    Tornado: 'cloudy',
    Clouds: 'cloudy'
}
