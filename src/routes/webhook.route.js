const express = require("express");
const webhookController = require("../controllers/webhook.controller");
const router = express.Router();

router.all("/receive", webhookController.handle);
module.exports = router;
