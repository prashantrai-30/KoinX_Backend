require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const logger = require('./src/config/logger')


const app = express();
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });