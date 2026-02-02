import React, { useState, useEffect } from 'react';
import './App.css';

// Weather API - Using OpenWeatherMap (Free)
const API_KEY = 'YOUR_API_KEY_HERE'; // Get from https://openweathermap.org/api
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
    // State management with useState
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('metric'); // metric or imperial
    const [searchHistory, setSearchHistory] = useState([]);

    // Load search history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('weatherSearchHistory');
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }

        // Get user's location weather on initial load
        getUserLocationWeather();
    }, []);

    // Save search history to localStorage whenever it changes
    useEffect(() => {
        if (searchHistory.length > 0) {
            localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
        }
    }, [searchHistory]);

    // Get weather for user's current location
    const getUserLocationWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.log('Location access denied:', error);
                    // Default to a city if location is denied
                    fetchWeather('London');
                }
            );
        }
    };

    // Fetch weather by coordinates
    const fetchWeatherByCoords = async (lat, lon) => {
        setLoading(true);
        setError(null);

        try {
            // Current weather
            const weatherResponse = await fetch(
                `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
            );

            if (!weatherResponse.ok) {
                throw new Error('Weather data not found');
            }

            const weatherData = await weatherResponse.json();
            setWeather(weatherData);

            // 5-day forecast
            const forecastResponse = await fetch(
                `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
            );

            const forecastData = await forecastResponse.json();
            setForecast(forecastData);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Fetch weather by city name
    const fetchWeather = async (cityName) => {
        if (!cityName.trim()) return;

        setLoading(true);
        setError(null);

        try {
            // Current weather
            const weatherResponse = await fetch(
                `${API_BASE_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
            );

            if (!weatherResponse.ok) {
                throw new Error('City not found');
            }

            const weatherData = await weatherResponse.json();
            setWeather(weatherData);

            // 5-day forecast
            const forecastResponse = await fetch(
                `${API_BASE_URL}/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
            );

            const forecastData = await forecastResponse.json();
            setForecast(forecastData);

            // Add to search history
            addToHistory(cityName);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setForecast(null);
            setLoading(false);
        }
    };

    // Add city to search history
    const addToHistory = (cityName) => {
        const newHistory = [cityName, ...searchHistory.filter(c => c !== cityName)].slice(0, 5);
        setSearchHistory(newHistory);
    };

    // Handle search form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
        setCity('');
    };

    // Toggle temperature unit
    const toggleUnit = () => {
        const newUnit = unit === 'metric' ? 'imperial' : 'metric';
        setUnit(newUnit);
        if (weather) {
            fetchWeather(weather.name);
        }
    };

    // Get weather icon URL
    const getWeatherIcon = (icon) => {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    };

    // Format date
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get daily forecast (one per day)
    const getDailyForecast = () => {
        if (!forecast) return [];

        const daily = {};
        forecast.list.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!daily[date]) {
                daily[date] = item;
            }
        });

        return Object.values(daily).slice(0, 5);
    };

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1>🌤️ Weather App</h1>
                    <p>Get real-time weather information for any city</p>
                </header>

                {/* Search Form */}
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name..."
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">
                        Search
                    </button>
                    <button type="button" onClick={toggleUnit} className="unit-toggle">
                        °{unit === 'metric' ? 'C' : 'F'}
                    </button>
                </form>

                {/* Search History */}
                {searchHistory.length > 0 && (
                    <div className="search-history">
                        <p>Recent searches:</p>
                        <div className="history-tags">
                            {searchHistory.map((city, index) => (
                                <button
                                    key={index}
                                    onClick={() => fetchWeather(city)}
                                    className="history-tag"
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading weather data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="error">
                        <span className="error-icon">⚠️</span>
                        <p>{error}</p>
                    </div>
                )}

                {/* Weather Display */}
                {weather && !loading && (
                    <>
                        <div className="current-weather">
                            <div className="weather-header">
                                <h2>{weather.name}, {weather.sys.country}</h2>
                                <p className="date">{formatDate(weather.dt)}</p>
                            </div>

                            <div className="weather-main">
                                <img
                                    src={getWeatherIcon(weather.weather[0].icon)}
                                    alt={weather.weather[0].description}
                                    className="weather-icon"
                                />
                                <div className="temperature">
                                    <h1>{Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</h1>
                                    <p className="feels-like">
                                        Feels like {Math.round(weather.main.feels_like)}°
                                    </p>
                                </div>
                            </div>

                            <p className="description">{weather.weather[0].description}</p>

                            <div className="weather-details">
                                <div className="detail">
                                    <span className="detail-icon">💧</span>
                                    <div>
                                        <p className="detail-label">Humidity</p>
                                        <p className="detail-value">{weather.main.humidity}%</p>
                                    </div>
                                </div>
                                <div className="detail">
                                    <span className="detail-icon">💨</span>
                                    <div>
                                        <p className="detail-label">Wind Speed</p>
                                        <p className="detail-value">
                                            {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                                        </p>
                                    </div>
                                </div>
                                <div className="detail">
                                    <span className="detail-icon">🌡️</span>
                                    <div>
                                        <p className="detail-label">Pressure</p>
                                        <p className="detail-value">{weather.main.pressure} hPa</p>
                                    </div>
                                </div>
                                <div className="detail">
                                    <span className="detail-icon">👁️</span>
                                    <div>
                                        <p className="detail-label">Visibility</p>
                                        <p className="detail-value">
                                            {(weather.visibility / 1000).toFixed(1)} km
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5-Day Forecast */}
                        {forecast && (
                            <div className="forecast">
                                <h3>5-Day Forecast</h3>
                                <div className="forecast-grid">
                                    {getDailyForecast().map((day, index) => (
                                        <div key={index} className="forecast-card">
                                            <p className="forecast-date">
                                                {formatDate(day.dt)}
                                            </p>
                                            <img
                                                src={getWeatherIcon(day.weather[0].icon)}
                                                alt={day.weather[0].description}
                                                className="forecast-icon"
                                            />
                                            <p className="forecast-temp">
                                                {Math.round(day.main.temp)}°
                                            </p>
                                            <p className="forecast-desc">
                                                {day.weather[0].main}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Empty State */}
                {!weather && !loading && !error && (
                    <div className="empty-state">
                        <span className="empty-icon">🌍</span>
                        <h3>Search for a city</h3>
                        <p>Enter a city name to get current weather and forecast</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;