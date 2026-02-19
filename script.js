// API Configuration
const API = {
    key: 'f1464481c55e4dec802142346261802',
    baseURL: 'https://api.openweathermap.org/data/2.5/',

    //api key not working
    //WHYYYYY
    //xeno tech heresy 
    //I will look at another time as evrything else looks like it's working 
    //on another note I need to start work on 

    async fetchWeather(city) {
        try {
            const response = await fetch(
                `${this.baseURL}weather?q=${city}&units=metric&appid=${this.key}`
            );

            if (!response.ok) {
                throw new Error('City not found');
            }

            return await response.json();

        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }
};

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    weatherResult.innerHTML = "<p>Loading...</p>";

    const data = await API.fetchWeather(city);

    if (!data) {
        weatherResult.innerHTML = "<p>City not found.</p>";
        return;
    }

    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    `;
}

// Button click
searchBtn.addEventListener('click', getWeather);

// Press Enter key
cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
