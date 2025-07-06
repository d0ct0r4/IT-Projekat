const express = require('express');
const router = express.Router();
const { getAllAuto, getCarsByClient, deleteCarsByVIN, insertAuto } = require('../controllers/autoController');

router.get('/', getAllAuto);
router.get('/client/:id', getCarsByClient);
router.delete('/delete/:vin', deleteCarsByVIN);
router.post('/insert', insertAuto);

module.exports = router;