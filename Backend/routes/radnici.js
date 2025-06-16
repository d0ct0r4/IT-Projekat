const express = require('express');
const router = express.Router();
const { getAllRadnici } = require('../controllers/radniciController');

router.get('/', getAllRadnici);

module.exports = router;