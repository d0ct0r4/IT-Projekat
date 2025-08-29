const express = require('express');
const router = express.Router();
const { getDjelovi, addDio, updateDio, deleteDio, pretraziDijelove } = require('../controllers/dijeloviController');

router.get('/', getDjelovi);
router.post('/dodaj', addDio);
router.post("/edit/:id", updateDio);
router.delete("/delete/:id", deleteDio);
router.get('/pretrazi', pretraziDijelove);

module.exports = router;