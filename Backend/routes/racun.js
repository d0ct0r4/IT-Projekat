const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { getAllRacun, getRacunByClient, printRacun } = require('../controllers/racunController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = file.fieldname + '-' + Date.now() + ext;
      cb(null, uniqueName);
    },
});

const upload = multer({storage: storage});

router.get('/', getAllRacun);
router.get('/client/:id', getRacunByClient);
router.post('/stampaj', upload.single('slika'), printRacun);

module.exports = router;