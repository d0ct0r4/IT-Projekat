const express = require('express');
const router = express.Router();
const { getAllRadnici, getSatnica, getAutomehanicari, getElektricari, createRadnik, deleteRadnik, updateRadnik } = require('../controllers/radniciController');

router.get('/', getAllRadnici);
router.get('/satnica/:jmbg', getSatnica);
router.get("/automehanicari", getAutomehanicari);
router.get("/elektricari", getElektricari);
router.post("/create", createRadnik);
router.delete("/:jmbg", deleteRadnik);
router.put("/:jmbg", updateRadnik);
router.put("/update/:jmbg", updateRadnik);

module.exports = router;