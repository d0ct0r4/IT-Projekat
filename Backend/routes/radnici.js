const express = require('express');
const router = express.Router();
const { getAllRadnici, getSatnica } = require('../controllers/radniciController');

router.get('/', getAllRadnici);
router.get('/satnica/:jmbg', getSatnica);

module.exports = router;