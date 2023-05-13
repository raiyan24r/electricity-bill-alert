const http = require("../utils/http").http;
const dotenv = require("dotenv").config();

async function getUserInfo($psid) {
  const info = await http.get(
    $psid +
      "?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=" +
      process.env.ACCESS_TOKEN
  );
  console.log("info: ", info.data);
  return info.data;
}

async function sendTextMessage($psid, $text) {
  console.log("sending text");
  let response = {
    messaging_type: "RESPONSE",
    recipient: {
      id: $psid,
    },
    message: {
      text: $text,
    },
  };
  //   console.log("response: ", response);
  return await http.post(
    "me/messages?access_token=" + process.env.ACCESS_TOKEN,
    response
  );
}

async function sendAlertNotificationRequest($psid) {
  console.log("sending alert");
  let response = {
    recipient: {
      id: $psid,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "notification_messages",
          title: "Get Daily Electricity Bill Notifications!",
          payload: "ADDITIONAL-WEBHOOK-INFORMATION",
          notification_messages_cta_text: "ALLOW",
          notification_messages_frequency: "DAILY",
          notification_messages_reoptin: "ENABLED",
        },
      },
    },
  };

  return await http.post(
    "me/messages?access_token=" + process.env.ACCESS_TOKEN,
    response
  );
}

module.exports = {
  getUserInfo,
  sendTextMessage,
  sendAlertNotificationRequest,
};
