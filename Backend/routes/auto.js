const express = require('express');
const router = express.Router();
const { getAllAuto, getCarsByClient, deleteCarsByVIN, insertAuto } = require('../controllers/autoController');

router.get('/', getAllAuto);
router.get('/client/:id', getCarsByClient);
router.get('/delete/:id', deleteCarsByVIN);
router.post('/insert', insertAuto);

module.exports = router;