const express = require('express');
const router = express.Router();
const { getAllRacun } = require('../controllers/racunController');

router.get('/', getAllRacun);

module.exports = router;