const axios = require("axios");
const dotenv = require("dotenv").config();

const http = axios.create({
  baseURL: process.env.FB_GRAPH_URL,
});

const logHttp = axios.create({
  baseURL: process.env.LOCAL_LOG_ROUTE,
});

module.exports = {
  http,
  logHttp,
};
