const apikey = "343ae20e36896b04b1486b144bba9077";
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const cityInput = document.getElementById("cityInput");
const loading = document.getElementById("loading");

window.onload = () => {
    const heading = document.querySelector("h1");
    heading.classList.add("show");

    loading.classList.add("hidden");
};

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        loading.classList.remove("hidden");
        console.log(loading);

        const response = await fetch(url);
        if(!response.ok){
            window.alert("City not found");
        }
        const data = await response.json();

        displayWeather(data);
        
    } catch (error) {
        weatherDisplay.innerHTML = `<p class="error animate__animated animate__shakeX">${error.message}</p>`;
    } finally {
        loading.classList.add("hidden");
        console.log(loading);
    }
}

function displayWeather(data) {
    if(data.cod === "404"){
        weatherDisplay.innerHTML = `<p>City not found<p>`
        return;
    }
    
    weatherDisplay.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} oC</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherDisplay.classList.add("visible");
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city) {
        weatherDisplay.innerHTML="";
        weatherDisplay.classList.remove("visible");
        getWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});