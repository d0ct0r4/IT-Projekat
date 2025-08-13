const express = require('express');
const router = express.Router();

const { getAllZahtjevi, getZahtjeviByClient, insertZahtjev, preuzetZahtjev, deleteZahtjev } = require('../controllers/zahtjeviController');

router.get('/', getAllZahtjevi);
router.get('/client/:id', getZahtjeviByClient);
router.post('/insert', insertZahtjev);
router.post('/update', preuzetZahtjev);
router.delete('/delete/:id', deleteZahtjev);

module.exports = router;    