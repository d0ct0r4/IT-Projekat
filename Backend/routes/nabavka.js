const express = require('express');
const router = express.Router();
const { getAllNabavka } = require('../controllers/nabavkaController');

router.get('/', getAllNabavka);

module.exports = router;