// API Configuration
const API = {
    key: 'f1464481c55e4dec802142346261802',
    baseURL: 'https://api.openweathermap.org/data/2.5/',

    async fetchWeather(city) {
        try {
            const response = await fetch(
                `${this.baseURL}weather?q=${city}&units=metric&appid=${this.key}`
            );

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('API Error:', error);
        }
    }
};

// App Initialization
document.addEventListener('DOMContentLoaded', async () => {
    const weather = await API.fetchWeather('London');
    console.log(weather);
});
