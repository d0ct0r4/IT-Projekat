const express = require('express');
const router = express.Router();
const { getAllZahtjevi, getZahtjeviByClient } = require('../controllers/zahtjeviController');

router.get('/', getAllZahtjevi);
router.get('/client/:id', getZahtjeviByClient);

module.exports = router;