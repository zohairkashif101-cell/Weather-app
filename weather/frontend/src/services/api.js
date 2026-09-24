import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const registerUser = async (userData) => {
    const response = await API.post("/auth/registerUser", userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await API.post("/auth/loginUser", credentials);

    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

export const getWeather = async (city) => {
    const response = await API.get("/weather", {
        params: { city },
    });
    return response.data;
};

export const getWeatherByLocation = async (lat, lon) => {
    const response = await API.get("/weather/location", {
        params: { lat, lon },
    });
    return response.data;
};

// 1. ADD FAVORITE CITY
export const addFavoriteCity = async (favoriteCity) => {
    // Try sending to /favourite or fallback to /favorite
    try {
        const response = await API.post("/weather/favourite", favoriteCity);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            const response = await API.post("/weather/favorite", favoriteCity);
            return response.data;
        }
        throw err;
    }
};

// 2. DELETE FAVORITE CITY
export const deleteFavoriteCity = async (id) => {
    try {
        const response = await API.delete(`/weather/favourite/${id}`);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            const response = await API.delete(`/weather/favorite/${id}`);
            return response.data;
        }
        throw err;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

export default API;