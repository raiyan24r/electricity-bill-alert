const webhookService = require("../services/webhook.service");
const messengerAppService = require("../services/messengerApp.service");
const axios = require("axios").default;

function handle(req, res) {
  if (req.method === "GET") {
    webhookService.verifyCallback(req, res);
  } else if (req.method === "POST") {
    console.log("msg received");
    axios
      .post(process.env.LOCAL_LOG_ROUTE + "/log", req.body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    let body = req.body;
    if (body.object === "page") {
      // console.log("11");
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
