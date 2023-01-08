const webhookService = require("../services/webhook.service");
const messengerAppService = require("../services/messengerApp.service");
const logHttp = require("../utils/http").logHttp;
const dotenv = require("dotenv").config();

function handle(req, res) {
  if (req.method === "GET") {
    webhookService.verifyCallback(req, res);
  } else if (req.method === "POST") {
    console.log("*************POST**************");
    logHttp.post(process.env.LOCAL_LOG_ROUTE + "/log", req.body);
    let body = req.body;
    switch (body.object) {
      case "page":
        let text = body.entry[0]?.messaging[0]?.message?.text;
        let optin = body.entry[0]?.messaging[0]?.optin;
        if (text !== undefined) {
          console.log("text: " + text);
          // messengerAppService.sendTextMessage(
          //   process.env.TEST_PSID,
          //   "You said " + text
          // );
        } else if (optin !== undefined) {
          if (optin.notification_messages_status === "STOP_NOTIFICATIONS") {
            console.log("STOP_NOTIFICATIONS");
            //alert flag disable
          } else if (
            optin.notification_messages_status === "RESUME_NOTIFICATIONS"
          ) {
            console.log("RESUME_NOTIFICATIONS");
            //alert flag enable
          } else if (optin.notification_messages_status === "ALLOWED") {
            console.log("ALLOWED");
            //alert flag enable
          }
        } else {
          res.sendStatus(200);
          return;
        }
        res.sendStatus(200);
        break;
      default:
        res.sendStatus(200);
        break;
    }
  }
}

module.exports = {
  handle,
};
