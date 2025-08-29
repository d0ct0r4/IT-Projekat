const express = require('express');
const router = express.Router();
const { getAllAuto, getCarsByClient, deleteCarsByVIN, insertAuto, getVinByVlasnik, getMarke, getModeliByMarka, searchAuta } = require('../controllers/autoController');

router.get('/', getAllAuto);
router.get('/client/:id', getCarsByClient);
router.delete('/delete/:vin', deleteCarsByVIN);
router.post('/insert', insertAuto);
router.get('/vin/:id', getVinByVlasnik);
router.get("/marke", getMarke);
router.get("/modeli/:marka", getModeliByMarka);
router.get("/search", searchAuta);

module.exports = router;