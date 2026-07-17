// Dynamic async resource fetching pattern placeholder
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
 * Handles invalid cities (404) and network failures safely.
 */
export async function fetchWeatherData(city) {
    const apiKey = "YOUR_ACTUAL_API_KEY_HERE"; // 👈 Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        
        // Check if the network response is NOT ok (e.g., 404 City Not Found or 401 Unauthorized)
        if (!response.ok) {
            if (response.status === 404) {
                return { error: true, message: "City not found. Please try again!" };
            } else if (response.status === 401) {
                return { error: true, message: "Invalid API key. Please check your setup." };
            } else {
                return { error: true, message: "Something went wrong. Please try later." };
            }
        }

        const data = await response.json();
        return { error: false, data: data };

    } catch (error) {
        // Triggers on offline network failures
        console.error('Weather API network error:', error);
        return { error: true, message: "Network error. Please check your internet connection!" };
    }
}