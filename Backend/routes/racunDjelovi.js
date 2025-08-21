const express = require('express');
const router = express.Router();
const { getRacuDjeloviByID } = require('../controllers/racunDjeloviController');

router.get('/client/:id', getRacuDjeloviByID);

module.exports = router;