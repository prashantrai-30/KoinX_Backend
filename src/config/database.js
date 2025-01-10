const mongoose = require('mongoose');
const logger = require('./logger')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOBD_URI);
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.info('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;