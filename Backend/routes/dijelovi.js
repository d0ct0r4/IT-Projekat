const express = require('express');
const router = express.Router();
const { getDjelovi, addDio, updateDio, deleteDio } = require('../controllers/dijeloviController');

router.get('/', getDjelovi);
router.post('/dodaj', addDio);
router.put("/:id", updateDio);
router.delete("/:id", deleteDio);

module.exports = router;