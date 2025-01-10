const express = require('express')
const router = express.Router();
const {stats} = require('../controllers/stats')
const {deviation} = require('../controllers/deviation')

router.get('/stats',stats)

router.get('/deviation',deviation)

module.exports = router;