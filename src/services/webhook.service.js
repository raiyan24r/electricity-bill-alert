const dotenv = require("dotenv").config();
const messengerAppService = require("./messengerApp.service");
const userService = require("./user.service");

function verifyCallback(req, res) {
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === process.env.VERIFY_TOKEN
  ) {
    console.log("Validating webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
}

function allowNotification($psid) {}

function stopNotifications($psid) {}

function resumeNotifications($psid) {}

function handleText($psid, $text) {}

async function handleGetStarted($psid) {
  const userInfo = await messengerAppService.getUserInfo($psid);
  console.log(userInfo);
  userService.createNew(userInfo);

  // create user in db
  // send welcome message
}

module.exports = {
  verifyCallback,
  allowNotification,
  stopNotifications,
  resumeNotifications,
  handleText,
  handleGetStarted,
};
