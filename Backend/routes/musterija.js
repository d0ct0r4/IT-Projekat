const express = require('express');
const router = express.Router();
const { getAllMusterija } = require('../controllers/musterijaController');

router.get('/', getAllMusterija);

module.exports = router;