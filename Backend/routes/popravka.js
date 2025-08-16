const express = require('express');
const router = express.Router();
const { getAllPopravka, getPopravkaByClient, getPopravkaByVin } = require('../controllers/popravkaController');

router.get('/', getAllPopravka);
router.get('/client/:id', getPopravkaByClient);
router.get('/auto/:vin', getPopravkaByVin);

module.exports = router;