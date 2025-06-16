const express = require('express');
const router = express.Router();
const { getAllAuto } = require('../controllers/autoController');

router.get('/', getAllAuto);

module.exports = router;