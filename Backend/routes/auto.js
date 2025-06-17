const express = require('express');
const router = express.Router();
const { getAllAuto, getCarsByClient } = require('../controllers/autoController');

router.get('/', getAllAuto);
router.get('/client/:id', getCarsByClient);

module.exports = router;