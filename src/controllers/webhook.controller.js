const webhookService = require("../services/webhook.service");
const messengerAppService = require("../services/messengerApp.service");
const logHttp = require("../utils/http").logHttp;
const dotenv = require("dotenv").config();

function handle(req, res) {
  try {
    if (req.method === "GET") {
      webhookService.verifyCallback(req, res);
    } else if (req.method === "POST") {
      console.log("msg received");
      logHttp
        .post(process.env.LOCAL_LOG_ROUTE + "/log", req.body)
        .then(function (response) {
          console.log("log sent");
        })
        .catch(function (error) {
          console.log(error);
        });

      let body = req.body;
      if (body.object === "page") {
        messengerAppService.sendTextMessage(
          process.env.TEST_PSID,
          "Hello, world!"
        );
        // messengerAppService.sendAlertNotificationRequest(process.env.TEST_PSID);
      }
    }
  } catch (err) {
    logHttp
      .post(process.env.LOCAL_LOG_ROUTE + "/log", JSON.stringify(err))
      .then(function (response) {
        console.log("error");
      });

    res.sendStatus(200);
  }
  res.sendStatus(200);
}

module.exports = {
  handle,
};
