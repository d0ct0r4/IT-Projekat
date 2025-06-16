const express = require('express');
const router = express.Router();
const { getAllFirma } = require('../controllers/firmaController');

router.get('/', getAllFirma);

module.exports = router;