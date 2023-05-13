const http = require("../utils/http").http;
const dotenv = require("dotenv").config();

function handleGetStarted(psid) {
  console.log("get started " + psid);
}

function handleTextMessage(psid, text) {
  console.log("text: ", text);
  console.log("psid: ", psid);
}

module.exports = {
  handleGetStarted,
  handleTextMessage,
};
