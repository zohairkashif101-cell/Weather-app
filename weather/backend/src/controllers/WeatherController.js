const axios = require('axios');
const Weather = require("../models/weather");

const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail",
};

const getCurrentWeather = async (latitude, longitude) => {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,visibility,wind_speed_10m,weather_code&wind_speed_unit=ms`;
        const weatherRes = await axios.get(weatherUrl);
        const current = weatherRes.data?.current ?? {};

        return {
            temperature: current.temperature_2m ?? 0,
            feelsLike: current.apparent_temperature ?? 0,
            humidity: current.relative_humidity_2m ?? 0,
            windSpeed: current.wind_speed_10m ?? 0,
            pressure: current.pressure_msl ?? 0,
            visibility: current.visibility ?? 0,
            condition: weatherDescriptions[current.weather_code] ?? "Current conditions",
            weatherCode: current.weather_code ?? 0,
        };
    } catch (err) {
        console.error("Open-Meteo Weather API Error:", err.message);
        throw err;
    }
};

// 1. Get Weather by City Name
const getWeather = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({
                message: "City name is required"
            });
        }

        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoRes = await axios.get(geoUrl);

        if (!geoRes.data || !geoRes.data.results || geoRes.data.results.length === 0) {
            return res.status(404).json({
                message: "City not found"
            });
        }

        const { latitude, longitude, name, country } = geoRes.data.results[0];
        const weather = await getCurrentWeather(latitude, longitude);

        return res.status(200).json({
            city: name,
            country: country,
            coordinates: { latitude, longitude },
            weather
        });

    } catch (error) {
        console.error("Back-end getWeather Error:", error.message);
        return res.status(500).json({
            message: "Failed to get weather details",
            error: error.message
        });
    }
};

// 2. Get Weather by Location (lat, lon)
const getWeatherByLocation = async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({
                message: "Latitude and longitude are required"
            });
        }

        const weather = await getCurrentWeather(lat, lon);

        return res.status(200).json({
            coordinates: { latitude: lat, longitude: lon },
            weather
        });

    } catch (error) {
        console.error("Back-end getWeatherByLocation Error:", error.message);
        return res.status(500).json({
            message: "Failed to get weather by location",
            error: error.message
        });
    }
};

// 3. Post Favourite City (Saved directly to MongoDB)
const postfavouritecity = async (req, res) => {
    try {
        if (!req.user || (!req.user._id && !req.user.id)) {
            return res.status(401).json({
                message: "User context not found. Please re-authenticate."
            });
        }

        const userId = req.user._id || req.user.id;
        const { city, temperature, feelsLike, humidity, windSpeed, description, icon } = req.body;

        if (!city) {
            return res.status(400).json({
                message: "City name is required"
            });
        }

        const favorite = await Weather.create({
            user: userId,
            city,
            temperature,
            feelsLike,
            humidity,
            windSpeed,
            description,
            icon: icon ? String(icon) : ""
        });

        return res.status(201).json({
            message: "City added to favorites",
            favorite,
        });

    } catch (error) {
        console.error("Back-end postfavouritecity Error:", error.message);
        return res.status(500).json({
            message: "Failed to add favorite city",
            error: error.message,
        });
    }
};

// 4. Delete Favourite City
const deletefavouritecity = async (req, res) => {
    try {
        if (!req.user || (!req.user._id && !req.user.id)) {
            return res.status(401).json({
                message: "User context not found. Please re-authenticate."
            });
        }

        const userId = req.user._id || req.user.id;

        const favorite = await Weather.findOneAndDelete({
            _id: req.params.id,
            user: userId
        });

        if (!favorite) {
            return res.status(404).json({
                message: "Favourite city not found"
            });
        }

        return res.status(200).json({
            message: "Favourite city deleted successfully"
        });

    } catch (error) {
        console.error("Back-end deletefavouritecity Error:", error.message);
        return res.status(500).json({
            message: "Failed to delete favourite city",
            error: error.message
        });
    }
};

module.exports = {
    getWeather,
    getWeatherByLocation,
    postfavouritecity,
    deletefavouritecity
};