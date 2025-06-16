const express = require('express');
const router = express.Router();
const { getAllAutomehanicar } = require('../controllers/automehanicarController');

router.get('/', getAllAutomehanicar);

module.exports = router;