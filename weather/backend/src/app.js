const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

// middleware cors
app.use(cors());

// middleware body parser
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

// home route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'weather app api is working' });
});

module.exports = app;
