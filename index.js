require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const logger = require('./src/config/logger')
const cryptoRoutes = require('./src/routes/cryptoRoutes')


const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use('/api',cryptoRoutes)

app.use((err, req,res,next) => {
    logger.error(err.stack);
    res.status(500).json({error: "Something went wrong!"})
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});