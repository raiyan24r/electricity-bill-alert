const webhookService = require("../services/webhook.service");
const messengerAppService = require("../services/messengerApp.service");
const logHttp = require("../utils/http").logHttp;
const dotenv = require("dotenv").config();
const electricBillService = require("../services/electricityBill.service");

async function handle(req, res) {
  if (req.method === "GET") {
    webhookService.verifyCallback(req, res);
  } else if (req.method === "POST") {
    console.log("*************POST**************");
    let body = req.body;
    switch (body.object) {
      case "page":
        let text = body.entry[0]?.messaging[0]?.message?.text;
        let optin = body.entry[0]?.messaging[0]?.optin;
        let postback = body.entry[0]?.messaging[0]?.postback;


        
        if (postback !== undefined) {
          const payload = postback.payload;
          if (payload === "get_started") {
            let psid = body.entry[0].messaging[0].sender?.id;
            await webhookService.handleGetStarted(psid);
            console.log(33);
          }
        } else if (text !== undefined) {
          console.log("text: " + text);
          const balanceData = await electricBillService.getBalanceByAccount(
            text
          );

          messengerAppService.sendTextMessage(
            process.env.TEST_PSID,
            "Balance : " +
              balanceData.balance +
              " Tk\nCurrent Month Consumption : " +
              balanceData.currentMonthConsumption +
              " Tk\nReading Time : " +
              balanceData.readingTime
          );
        } else if (optin !== undefined) {
          if (optin.notification_messages_status === "STOP_NOTIFICATIONS") {
            console.log("STOP_NOTIFICATIONS");
            //alert flag disable
          } else if (
            optin.notification_messages_status === "RESUME_NOTIFICATIONS"
          ) {
            console.log("RESUME_NOTIFICATIONS");
            //alert flag enable
          } else if ("notification_messages_status" in optin === false) {
            console.log("ALLOWED");
            console.log("notification_messages_status" in optin === false);
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
