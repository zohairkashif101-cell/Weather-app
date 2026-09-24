const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log((`Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`));
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }

};

startServer();