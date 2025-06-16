const express = require('express');
const router = express.Router();
const { getAllPopravka } = require('../controllers/popravkaController');

router.get('/', getAllPopravka);

module.exports = router;