const express = require('express');
const router = express.Router();
const { getDjelovi, addDio } = require('../controllers/dijeloviController');

router.get('/', getDjelovi);
router.post('/dodaj', addDio);

module.exports = router;