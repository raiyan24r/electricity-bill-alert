const express = require("express");
const updateController = require("../controllers/update.controller");
const router = express.Router();

router.all("/receive", updateController.handle);
module.exports = router;
