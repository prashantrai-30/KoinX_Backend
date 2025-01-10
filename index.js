require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');


const app = express();
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });