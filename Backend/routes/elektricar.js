const express = require('express');
const router = express.Router();
const { getAllElektricar } = require('../controllers/elektricarController');

router.get('/', getAllElektricar);

module.exports = router;