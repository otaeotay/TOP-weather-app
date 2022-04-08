// const img = document.querySelector('img');
const key = '4bfc436aca5f629cb3fb3d635691dfca';
let units = 'imperial';
//%20 is a space

const cityDiv = document.querySelector('#city');
const tempDiv = document.querySelector('#temperature');
const skyDiv = document.querySelector('#sky');
const weatherSvg = document.querySelector('#svg');
const cityInput = document.querySelector('#city-input');
const unitBtns = document.querySelectorAll('.units');
let lastCity = '';
let selectedUnit = '°F';

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeather();
    cityInput.value = '';
  }
});

unitBtns.forEach((e)=>e.addEventListener('click', (g) => changeUnit(g)));

function changeUnit(unit){
  selectedUnit = unit.target.textContent;
  if(selectedUnit=='°C'){
    units = 'metric';
    getWeather();
  } else{
    units = 'imperial';
    getWeather();
  }
}

function getCity(){
  let city = cityInput.value;
  if(city){
    city.replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
    city.replace(/(,\s+)/g, ',') // remove any white space that follows a comma
    city.replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
    city.replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
    lastCity = city;
  } else if(!lastCity){
    city = 'san+francisco';
    lastCity = city;
  } else{
    city = lastCity;
  }
  return lastCity;
}


async function getWeather() {
    const city = getCity();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    const weatherObj = {
        cityName: weatherData.name,
        temp: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        code: weatherData.weather[0].icon
    }
    cityDiv.textContent = weatherObj.cityName.toLowerCase();
    tempDiv.textContent = Math.round(weatherObj.temp)+selectedUnit;
    skyDiv.textContent = weatherObj.condition;
    let dood = getIcon(weatherObj.code);
    weatherSvg.innerHTML = dood;
}

getWeather();

function getIcon(code) {
    if (code === '01d') {
        return `<svg class="svg-icon" viewBox="0 0 20 20">
        <title>clear-day</title>
        <path fill="none" d="M5.114,5.726c0.169,0.168,0.442,0.168,0.611,0c0.168-0.169,0.168-0.442,0-0.61L3.893,3.282c-0.168-0.168-0.442-0.168-0.61,0c-0.169,0.169-0.169,0.442,0,0.611L5.114,5.726z M3.955,10c0-0.239-0.193-0.432-0.432-0.432H0.932C0.693,9.568,0.5,9.761,0.5,10s0.193,0.432,0.432,0.432h2.591C3.761,10.432,3.955,10.239,3.955,10 M10,3.955c0.238,0,0.432-0.193,0.432-0.432v-2.59C10.432,0.693,10.238,0.5,10,0.5S9.568,0.693,9.568,0.932v2.59C9.568,3.762,9.762,3.955,10,3.955 M14.886,5.726l1.832-1.833c0.169-0.168,0.169-0.442,0-0.611c-0.169-0.168-0.442-0.168-0.61,0l-1.833,1.833c-0.169,0.168-0.169,0.441,0,0.61C14.443,5.894,14.717,5.894,14.886,5.726 M5.114,14.274l-1.832,1.833c-0.169,0.168-0.169,0.441,0,0.61c0.168,0.169,0.442,0.169,0.61,0l1.833-1.832c0.168-0.169,0.168-0.442,0-0.611C5.557,14.106,5.283,14.106,5.114,14.274 M19.068,9.568h-2.591c-0.238,0-0.433,0.193-0.433,0.432s0.194,0.432,0.433,0.432h2.591c0.238,0,0.432-0.193,0.432-0.432S19.307,9.568,19.068,9.568 M14.886,14.274c-0.169-0.168-0.442-0.168-0.611,0c-0.169,0.169-0.169,0.442,0,0.611l1.833,1.832c0.168,0.169,0.441,0.169,0.61,0s0.169-0.442,0-0.61L14.886,14.274z M10,4.818c-2.861,0-5.182,2.32-5.182,5.182c0,2.862,2.321,5.182,5.182,5.182s5.182-2.319,5.182-5.182C15.182,7.139,12.861,4.818,10,4.818M10,14.318c-2.385,0-4.318-1.934-4.318-4.318c0-2.385,1.933-4.318,4.318-4.318c2.386,0,4.318,1.933,4.318,4.318C14.318,12.385,12.386,14.318,10,14.318 M10,16.045c-0.238,0-0.432,0.193-0.432,0.433v2.591c0,0.238,0.194,0.432,0.432,0.432s0.432-0.193,0.432-0.432v-2.591C10.432,16.238,10.238,16.045,10,16.045"></path>
        </svg>`;
    }
  
    if (code === '01n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>clear-night</title>
      <path fill="none" d="M10.544,8.717l1.166-0.855l1.166,0.855l-0.467-1.399l1.012-0.778h-1.244L11.71,5.297l-0.466,1.244H10l1.011,0.778L10.544,8.717z M15.986,9.572l-0.467,1.244h-1.244l1.011,0.777l-0.467,1.4l1.167-0.855l1.165,0.855l-0.466-1.4l1.011-0.777h-1.244L15.986,9.572z M7.007,6.552c0-2.259,0.795-4.33,2.117-5.955C4.34,1.042,0.594,5.07,0.594,9.98c0,5.207,4.211,9.426,9.406,9.426c2.94,0,5.972-1.354,7.696-3.472c-0.289,0.026-0.987,0.044-1.283,0.044C11.219,15.979,7.007,11.759,7.007,6.552 M10,18.55c-4.715,0-8.551-3.845-8.551-8.57c0-3.783,2.407-6.999,5.842-8.131C6.549,3.295,6.152,4.911,6.152,6.552c0,5.368,4.125,9.788,9.365,10.245C13.972,17.893,11.973,18.55,10,18.55 M19.406,2.304h-1.71l-0.642-1.71l-0.642,1.71h-1.71l1.39,1.069l-0.642,1.924l1.604-1.176l1.604,1.176l-0.642-1.924L19.406,2.304z"></path>
      </svg>`;
    }
    if (code === '02d') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>cloudy-day</title>
      <path fill="none" d="M17.668,11.332c1.086-0.947,1.775-2.337,1.775-3.892c0-2.853-2.313-5.167-5.166-5.167c-2.592,0-4.731,1.911-5.104,4.399C8.873,6.617,8.566,6.579,8.25,6.579c-2.593,0-4.734,1.912-5.104,4.402C1.629,11.342,0.5,12.701,0.5,14.328c0,1.902,1.542,3.444,3.444,3.444h12.055c1.902,0,3.444-1.542,3.444-3.444C19.443,13.035,18.723,11.92,17.668,11.332 M14.277,3.134c2.378,0,4.306,1.929,4.306,4.306c0,1.408-0.68,2.653-1.724,3.438c-0.002-1.424-1.158-2.578-2.582-2.578c-0.651,0-1.245,0.243-1.699,0.64c-0.605-0.935-1.507-1.656-2.568-2.044C10.277,4.776,12.084,3.134,14.277,3.134 M15.999,16.911H3.944c-1.425,0-2.583-1.158-2.583-2.583c0-1.2,0.816-2.231,1.984-2.51c0.342-0.081,0.601-0.362,0.653-0.71C4.309,9.017,6.136,7.44,8.25,7.44c1.46,0,2.377,0.306,3.175,1.538c0.137,0.21,0.787,0.781,1.034,0.815c0.04,0.006,0.119,0.008,0.119,0.008c0.208,0,0.409-0.074,0.567-0.212c0.314-0.275,0.717-0.427,1.132-0.427c0.949,0,1.722,0.772,1.721,1.731l-0.004,0.063c-0.019,0.408,0.252,0.772,0.646,0.874c1.144,0.292,1.942,1.32,1.942,2.498C18.583,15.753,17.424,16.911,15.999,16.911"></path>
      </svg>`;
    }
    if (code === '02n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>cloudy-night</title>
      <path fill="none" d="M 17.668 11.332 C 18.754 10.385 19.443 8.995 19.159 6.429 C 15.609 8.266 12.848 8.705 12.527 2.64 C 11 3 9.546 4.184 9.173 6.672 C 8.873 6.617 8.566 6.579 8.25 6.579 C 5.657 6.579 3.516 8.491 3.146 10.981 C 1.629 11.342 0.5 12.701 0.5 14.328 C 0.5 16.23 2.042 17.772 3.944 17.772 H 15.999 C 17.901 17.772 19.443 16.23 19.443 14.328 C 19.443 13.035 18.723 11.92 17.668 11.332 M 12.006 3.61 C 12 7 14 10 18.583 7.44 C 18.583 8.848 17.903 10.093 16.859 10.878 C 16.857 9.454 15.701 8.3 14.277 8.3 C 13.626 8.3 13.032 8.543 12.578 8.94 C 11.973 8.005 11.071 7.284 10.01 6.896 C 10.277 4.776 11 4 12.023 3.592 M 15.999 16.911 H 3.944 C 2.519 16.911 1.361 15.753 1.361 14.328 C 1.361 13.128 2.177 12.097 3.345 11.818 C 3.687 11.737 3.946 11.456 3.998 11.108 C 4.309 9.017 6.136 7.44 8.25 7.44 C 9.71 7.44 10.627 7.746 11.425 8.978 C 11.562 9.188 12.212 9.759 12.459 9.793 C 12.499 9.799 12.578 9.801 12.578 9.801 C 12.786 9.801 12.987 9.727 13.145 9.589 C 13.459 9.314 13.862 9.162 14.277 9.162 C 15.226 9.162 15.999 9.934 15.998 10.893 L 15.994 10.956 C 15.975 11.364 16.246 11.728 16.64 11.83 C 17.784 12.122 18.582 13.15 18.582 14.328 C 18.583 15.753 17.424 16.911 15.999 16.911"></path>
      </svg>`;
    }
    if (code === '03d' || code === '03n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>cloud</title>
      <path fill="none" d="M16.889,8.82c0.002-0.038,0.006-0.075,0.006-0.112c0-1.427-1.158-2.585-2.586-2.585c-0.65,0-1.244,0.243-1.699,0.641c-0.92-1.421-2.513-2.364-4.333-2.364c-2.595,0-4.738,1.914-5.108,4.406c-1.518,0.361-2.648,1.722-2.648,3.35c0,1.904,1.543,3.447,3.447,3.447h12.065c1.904,0,3.447-1.543,3.447-3.447C19.48,10.547,18.377,9.201,16.889,8.82 M16.033,14.74H3.968c-1.426,0-2.585-1.16-2.585-2.586c0-1.2,0.816-2.233,1.985-2.512C3.71,9.561,3.969,9.279,4.021,8.931C4.333,6.838,6.162,5.26,8.277,5.26c1.461,0,2.811,0.736,3.61,1.971c0.135,0.21,0.355,0.351,0.604,0.385c0.039,0.006,0.08,0.008,0.119,0.008c0.207,0,0.408-0.074,0.566-0.212c0.316-0.275,0.719-0.428,1.133-0.428c0.951,0,1.725,0.773,1.723,1.733L16.027,8.78c-0.018,0.408,0.252,0.772,0.646,0.874c1.146,0.293,1.945,1.321,1.945,2.5C18.619,13.58,17.459,14.74,16.033,14.74"></path>
      </svg>`;
    }
    if (code === '04d' || code === '04n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>cloudy</title>
      <path fill="none" d="M16.888,8.614c0.008-0.117,0.018-0.233,0.018-0.352c0-2.851-2.311-5.161-5.16-5.161c-1.984,0-3.705,1.121-4.568,2.763c-0.32-0.116-0.664-0.182-1.023-0.182c-1.663,0-3.011,1.348-3.011,3.01c0,0.217,0.024,0.427,0.067,0.631c-1.537,0.513-2.647,1.96-2.647,3.67c0,2.138,1.733,3.87,3.871,3.87h10.752c2.374,0,4.301-1.925,4.301-4.301C19.486,10.792,18.416,9.273,16.888,8.614 M15.186,16.003H4.433c-1.66,0-3.01-1.351-3.01-3.01c0-1.298,0.827-2.444,2.06-2.854l0.729-0.243l-0.16-0.751C4.02,8.993,4.003,8.841,4.003,8.692c0-1.186,0.965-2.15,2.151-2.15c0.245,0,0.49,0.045,0.729,0.131l0.705,0.256l0.35-0.664c0.748-1.421,2.207-2.303,3.807-2.303c2.371,0,4.301,1.929,4.301,4.301c0,0.075-0.007,0.148-0.012,0.223l-0.005,0.073L15.99,9.163l0.557,0.241c1.263,0.545,2.079,1.785,2.079,3.159C18.626,14.46,17.082,16.003,15.186,16.003"></path>
      </svg>`;
    }
    if (code === '09d' || code === '09n' || code === '10d' || code === '10n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>rainy</title>
      <path fill="none" d="M8.705,15.182c-0.238,0-0.432,0.193-0.432,0.432v2.592c0,0.238,0.194,0.432,0.432,0.432s0.432-0.193,0.432-0.432v-2.592C9.137,15.375,8.943,15.182,8.705,15.182 M11.295,14.318c-0.238,0-0.432,0.193-0.432,0.432v2.591c0,0.238,0.193,0.432,0.432,0.432c0.239,0,0.433-0.193,0.433-0.432V14.75C11.728,14.512,11.534,14.318,11.295,14.318 M3.522,13.455c-0.238,0-0.432,0.193-0.432,0.432v2.591c0,0.239,0.194,0.432,0.432,0.432c0.238,0,0.432-0.192,0.432-0.432v-2.591C3.955,13.648,3.761,13.455,3.522,13.455 M6.113,14.318c-0.238,0-0.431,0.193-0.431,0.432v1.728c0,0.239,0.193,0.432,0.431,0.432c0.239,0,0.432-0.192,0.432-0.432V14.75C6.545,14.512,6.352,14.318,6.113,14.318 M16.903,5.793c0.002-0.037,0.006-0.073,0.006-0.112c0-1.43-1.161-2.59-2.591-2.59c-0.653,0-1.248,0.243-1.704,0.642c-0.922-1.424-2.518-2.369-4.342-2.369c-2.601,0-4.748,1.918-5.119,4.415C1.633,6.141,0.5,7.504,0.5,9.136c0,1.908,1.546,3.455,3.455,3.455h12.09c1.908,0,3.455-1.547,3.455-3.455C19.5,7.526,18.396,6.176,16.903,5.793 M16.045,11.728H3.955c-1.429,0-2.591-1.162-2.591-2.591c0-1.203,0.819-2.239,1.99-2.517c0.343-0.082,0.602-0.364,0.654-0.713C4.32,3.809,6.153,2.227,8.272,2.227c1.465,0,2.384,0.307,3.186,1.543c0.136,0.21,0.789,0.783,1.037,0.817c0.04,0.006,0.119,0.009,0.119,0.009c0.208,0,0.41-0.075,0.568-0.213c0.315-0.276,0.72-0.429,1.136-0.429c0.953,0,1.727,0.775,1.726,1.736l-0.003,0.063c-0.02,0.409,0.252,0.774,0.648,0.876c1.146,0.294,1.946,1.324,1.946,2.506C18.636,10.565,17.475,11.728,16.045,11.728M13.887,13.455c-0.238,0-0.432,0.193-0.432,0.432v2.591c0,0.239,0.193,0.432,0.432,0.432s0.432-0.192,0.432-0.432v-2.591C14.318,13.648,14.125,13.455,13.887,13.455 M16.477,13.455c-0.237,0-0.432,0.193-0.432,0.432v1.727c0,0.239,0.194,0.433,0.432,0.433c0.239,0,0.433-0.193,0.433-0.433v-1.727C16.909,13.648,16.716,13.455,16.477,13.455"></path>
      </svg>`;
    }
    if (code === '11d' || code === '11n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>lightning</title>
      <path fill="none" d="M10.943,13.822c0-0.234-0.19-0.425-0.425-0.425c-0.117,0-0.224,0.048-0.3,0.125L7.67,16.07c-0.077,0.077-0.125,0.184-0.125,0.301c0,0.234,0.19,0.424,0.425,0.424h1.523L7.67,18.619c-0.077,0.077-0.125,0.183-0.125,0.3c0,0.235,0.19,0.425,0.425,0.425c0.117,0,0.223-0.047,0.3-0.124l2.548-2.549c0.077-0.076,0.125-0.183,0.125-0.3c0-0.235-0.19-0.425-0.425-0.425h-0.001H8.996l1.823-1.823C10.896,14.046,10.943,13.939,10.943,13.822 M16.883,5.014c0.002-0.037,0.006-0.073,0.006-0.11c0-1.407-1.141-2.548-2.548-2.548c-0.642,0-1.228,0.24-1.676,0.631c-0.906-1.4-2.477-2.33-4.27-2.33c-2.559,0-4.669,1.886-5.035,4.342C1.864,5.354,0.75,6.696,0.75,8.301c0,1.877,1.521,3.398,3.397,3.398H16.04c1.876,0,3.397-1.521,3.397-3.398C19.438,6.717,18.351,5.389,16.883,5.014 M16.04,10.849H4.147c-1.405,0-2.548-1.143-2.548-2.548c0-1.184,0.804-2.201,1.957-2.476c0.337-0.08,0.593-0.358,0.644-0.701c0.306-2.063,2.11-3.618,4.194-3.618c1.44,0,2.345,0.301,3.132,1.518c0.135,0.207,0.776,0.77,1.021,0.804c0.039,0.006,0.117,0.008,0.117,0.008c0.205,0,0.403-0.073,0.56-0.21c0.311-0.271,0.707-0.421,1.116-0.421c0.937,0,1.699,0.762,1.698,1.708l-0.005,0.062c-0.018,0.402,0.249,0.762,0.639,0.861c1.128,0.289,1.915,1.303,1.915,2.465C18.588,9.706,17.445,10.849,16.04,10.849"></path>
      </svg>`;
    }
    if (code === '13d' || code === '13n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>snow</title>
      <path fill="none" d="M7.409,12.653c-0.477,0-0.864,0.388-0.864,0.863c0,0.478,0.387,0.864,0.864,0.864s0.864-0.387,0.864-0.864C8.273,13.041,7.886,12.653,7.409,12.653 M4.818,16.972c-0.477,0-0.864,0.387-0.864,0.863c0,0.478,0.387,0.864,0.864,0.864c0.476,0,0.863-0.387,0.863-0.864C5.682,17.358,5.294,16.972,4.818,16.972 M3.091,14.381c-0.477,0-0.864,0.387-0.864,0.863s0.387,0.864,0.864,0.864s0.864-0.388,0.864-0.864S3.567,14.381,3.091,14.381 M10,16.108c-0.477,0-0.864,0.387-0.864,0.863S9.523,17.835,10,17.835s0.864-0.387,0.864-0.863S10.477,16.108,10,16.108 M14.318,14.381c0-0.477-0.388-0.864-0.864-0.864s-0.863,0.388-0.863,0.864c0,0.478,0.387,0.863,0.863,0.863S14.318,14.858,14.318,14.381 M16.903,4.992c0.002-0.037,0.006-0.074,0.006-0.111c0-1.431-1.16-2.591-2.591-2.591c-0.653,0-1.248,0.244-1.704,0.642c-0.922-1.424-2.518-2.369-4.341-2.369c-2.601,0-4.748,1.918-5.119,4.415C1.633,5.34,0.5,6.703,0.5,8.335c0,1.908,1.547,3.455,3.455,3.455h12.091c1.907,0,3.454-1.547,3.454-3.455C19.5,6.724,18.396,5.375,16.903,4.992 M16.046,10.926H3.955c-1.429,0-2.591-1.162-2.591-2.591c0-1.204,0.817-2.238,1.99-2.517c0.343-0.081,0.603-0.364,0.655-0.713C4.32,3.007,6.153,1.426,8.273,1.426c1.464,0,2.384,0.306,3.185,1.543c0.136,0.21,0.789,0.783,1.037,0.817c0.04,0.006,0.119,0.009,0.119,0.009c0.208,0,0.41-0.075,0.568-0.214c0.315-0.275,0.72-0.428,1.136-0.428c0.952,0,1.728,0.775,1.726,1.737L16.04,4.953c-0.019,0.409,0.253,0.775,0.648,0.876c1.147,0.293,1.948,1.324,1.948,2.506C18.637,9.764,17.475,10.926,16.046,10.926 M16.909,15.244c-0.477,0-0.863,0.388-0.863,0.864c0,0.478,0.387,0.863,0.863,0.863s0.863-0.386,0.863-0.863C17.772,15.632,17.386,15.244,16.909,15.244 M14.318,17.835c-0.477,0-0.864,0.387-0.864,0.864c0,0.477,0.388,0.863,0.864,0.863s0.863-0.387,0.863-0.863C15.182,18.222,14.795,17.835,14.318,17.835"></path>
      </svg>`;
    }
    if (code === '50d' || code === '50n') {
      return `<svg class="svg-icon" viewBox="0 0 20 20">
      <title>mist</title>
      <path fill="none" d="M 18.6 16.7 C 18.6 16.5 18.6 16.5 18.6 16.3 C 18.6 16.1 18.4 16 18 16 L 2 16 C 1.6 16 1.4 16.1 1.4 16.3 C 1.4 16.5 1.4 16.5 1.4 16.7 C 1.4 16.9 1.6 17 2 17 L 18 17 C 18.4 17 18.6 16.9 18.6 16.7 M 18.6 14.5 C 18.6 14.5 18.6 14.5 18.6 14.3 C 18.6 14.1 18.4 14 18 14 L 2 14 C 1.6 14 1.4 14.1 1.4 14.3 C 1.4 14.5 1.4 14.5 1.4 14.7 C 1.4 14.9 1.6 15 2 15 L 18 15 C 18.4 15 18.6 14.9 18.6 14.7 M 16.767 6.724 C 16.769 6.687 16.773 6.651 16.773 6.614 C 16.773 5.212 15.635 4.074 14.233 4.074 C 13.593 4.074 13.01 4.312 12.563 4.703 C 11.66 3.307 10.095 2.381 8.307 2.381 C 5.758 2.381 3.653 4.261 3.289 6.709 C 1.798 7.063 0.688 8.401 0.688 10 C 0.688 11.87 2.204 13.387 4.074 13.387 H 15.926 C 17.796 13.387 19.313 11.87 19.313 10 C 19.312 8.421 18.229 7.099 16.767 6.724 M 15.926 12.54 H 4.074 C 2.674 12.54 1.534 11.4 1.534 10 C 1.534 8.82 2.336 7.806 3.485 7.532 C 3.821 7.453 4.075 7.176 4.127 6.834 C 4.433 4.778 6.23 3.228 8.307 3.228 C 9.743 3.228 10.644 3.528 11.429 4.741 C 11.563 4.947 12.202 5.509 12.446 5.542 C 12.485 5.548 12.563 5.55 12.563 5.55 C 12.767 5.55 12.965 5.477 13.121 5.341 C 13.431 5.07 13.826 4.921 14.233 4.921 C 15.168 4.921 15.926 5.68 15.925 6.623 L 15.921 6.685 C 15.903 7.086 16.168 7.444 16.558 7.543 C 17.681 7.831 18.466 8.841 18.466 10 C 18.466 11.4 17.326 12.54 15.926 12.54"></path>
      </svg>`;
    }
}