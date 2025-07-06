const express = require('express');
const router = express.Router();
const { getAllZahtjevi, getZahtjeviByClient, insertZahtjev } = require('../controllers/zahtjeviController');

router.get('/', getAllZahtjevi);
router.get('/client/:id', getZahtjeviByClient);
router.post('/insert', insertZahtjev);

module.exports = router;    