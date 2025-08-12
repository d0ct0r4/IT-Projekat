const express = require('express');
const router = express.Router();
const { getAllAuto, getCarsByClient, deleteCarsByVIN, insertAuto, getVinByVlasnik } = require('../controllers/autoController');

router.get('/', getAllAuto);
router.get('/client/:id', getCarsByClient);
router.delete('/delete/:vin', deleteCarsByVIN);
router.post('/insert', insertAuto);
router.get('/vin/:id', getVinByVlasnik);

module.exports = router;