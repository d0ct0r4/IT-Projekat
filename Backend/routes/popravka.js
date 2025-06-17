const express = require('express');
const router = express.Router();
const { getAllPopravka, getPopravkaByClient } = require('../controllers/popravkaController');

router.get('/', getAllPopravka);
router.get('/client/:id', getPopravkaByClient);


module.exports = router;