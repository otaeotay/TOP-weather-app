// const img = document.querySelector('img');
const key = '4bfc436aca5f629cb3fb3d635691dfca';
const city = 'san%20francisco';
const units = 'imperial';
//%20 is a space

const cityDiv = document.querySelector('#city');
const tempDiv = document.querySelector('#temperature');
const skyDiv = document.querySelector('#sky');

async function getCats() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    const weatherObj = {
        cityName: weatherData.name,
        temp: weatherData.main.temp,
        condition: weatherData.weather[0].description
    }
    cityDiv.textContent = weatherObj.cityName;
    tempDiv.textContent = weatherObj.temp;
    skyDiv.textContent = weatherObj.condition;
    
}

getCats();