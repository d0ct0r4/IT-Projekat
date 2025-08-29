const express = require("express");
const router = express.Router();
const dostavaController = require("../controllers/dostavaController");

router.get("/", dostavaController.getDostave);
router.get("/:id/stavke", dostavaController.getDostavaStavke);
router.post("/add", dostavaController.addDostava);

module.exports = router;
