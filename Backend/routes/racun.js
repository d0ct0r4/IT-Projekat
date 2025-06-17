const express = require('express');
const router = express.Router();
const { getAllRacun, getRacunByClient } = require('../controllers/racunController');

router.get('/', getAllRacun);
router.get('/client/:id', getRacunByClient);


module.exports = router;