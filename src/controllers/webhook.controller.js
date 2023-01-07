const webhookService = require("../services/webhook.service");
const messengerAppService = require("../services/messengerApp.service");
// const axios = require("axios").default;
const basicHttp = require("../utils/basicHttp");
const dotenv = require("dotenv").config();

function handle(req, res) {
  if (req.method === "GET") {
    webhookService.verifyCallback(req, res);
  } else if (req.method === "POST") {
    console.log("msg received");
    basicHttp
      .post(process.env.LOCAL_LOG_ROUTE + "/log", req.body)
      .then(function (response) {
        res.send(response);
      })
      .catch(function (error) {
        res.send(error);
      });
    res.send("dfdf");
    let body = req.body;
    if (body.object === "page") {
      messengerAppService.sendTextMessage(
        process.env.TEST_PSID,
        "Hello, world!"
      );
      messengerAppService.sendAlertNotificationRequest(process.env.TEST_PSID);
    }

    res.sendStatus(200);
  }
}

module.exports = {
  handle,
};
