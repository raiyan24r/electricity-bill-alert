const webhookHandlerService = require("../services/webhookHandler.service");
const dotenv = require("dotenv").config();
const logger = require("../utils/logger");

async function handle(req, res) {
  if (req.method === "GET") {
    webhookService.verifyCallback(req, res);
  } else if (req.method === "POST") {
    logger.info("test-post");
    let body = req.body;
    switch (body.object) {
      case "page":
        console.log("page");
        let text = body.entry[0]?.messaging[0]?.message?.text;
        let optin = body.entry[0]?.messaging[0]?.optin;
        let postback = body.entry[0]?.messaging[0]?.postback;
        const psid = body.entry[0].messaging[0].sender?.id;
        console.log({ text, optin, postback, psid });

        if (postback !== undefined) {
          if (postback.payload.toUpperCase() === "get_started") {
            webhookHandlerService.handleGetStarted(psid);
          }
        } else if (text !== undefined) {
          webhookHandlerService.handleTextMessage(psid, text);
        }

        break;
      default:
        console.log("default");
    }
    res.sendStatus(200);
  }
}

module.exports = {
  handle,
};
