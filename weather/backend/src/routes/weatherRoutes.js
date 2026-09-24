const express = require('express');
const router = express.Router();
const {
    getWeather,
    getWeatherByLocation,
    postfavouritecity,
    deletefavouritecity
} = require('../controllers/WeatherController');

const protect = require('../middleware/authMiddleware'); // Middleware import

// Public routes
router.get('/', getWeather);
router.get('/location', getWeatherByLocation);

// Protected routes (Login zaroori hai)
router.post('/favourite', protect, postfavouritecity);
router.delete('/favourite/:id', protect, deletefavouritecity);

module.exports = router;