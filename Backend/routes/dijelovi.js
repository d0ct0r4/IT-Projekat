const express = require('express');
const router = express.Router();
const { getAllDijelovi } = require('../controllers/dijeloviController');

router.get('/', getAllDijelovi);

module.exports = router;