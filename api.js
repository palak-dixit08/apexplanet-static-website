// api.js

export async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) throw new Error('Network issue during delivery');
        const data = await response.json();
        console.log('Resource context loaded successfully:', data.name);
        return data;
    } catch (error) {
        console.error('Data pipeline error:', error);
    }
}

/**
 * Fetches current weather data for a given city from OpenWeatherMap.
 */
export async function fetchWeatherData(city) {
    const apiKey = "69713bf835894fcda838775844810c9f"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                return { error: true, message: "City not found. Please try again!" };
            } else if (response.status === 401) {
                return { error: true, message: "Invalid API key or key is still activating." };
            } else {
                return { error: true, message: "Something went wrong. Please try later." };
            }
        }

        const data = await response.json();
        return { error: false, data: data };

    } catch (error) {
        console.error('Weather API network error:', error);
        return { error: true, message: "Network error. Check your internet connection!" };
    }
}