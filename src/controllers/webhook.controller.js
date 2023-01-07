const webhookService = require("../services/webhook.service");
// const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

function handle(req, res) {
  if (req.method === "GET") {
    webhookService.verifyCallback(req, res);
  } else if (req.method === "POST") {
    // console.log(req.body);
    // axios
    //   .post(process.env.LOCAL_LOG_ROUTE + "/log", req.body)
    //   .then(function (response) {
    //     // console.log(response);
    //   });

    console.log("POST");
    res.sendStatus(200);
  }
}

module.exports = {
  handle,
};
