
const API_KEY = "API-KEY"; 
const BASE_URL = "https://api.weatherbit.io/v2.0/current";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

fetchWeather("London");

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?city=${city}&key=${API_KEY}&units=M`);
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.message || "City not found");
    
    updateUI(data.data[0]);
  } catch (error) {
    alert("Error: " + error.message);
    console.error(error);
  }
}

function updateUI(weather) {
  cityName.textContent = weather.city_name;
  currentDate.textContent = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  temperature.textContent = weather.temp;
  weatherDescription.textContent = weather.weather.description;
  humidity.textContent = weather.rh;
  windSpeed.textContent = (weather.wind_spd * 3.6).toFixed(1); // Convert m/s to km/h
}
