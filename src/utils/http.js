const axios = require("axios");
const dotenv = require("dotenv").config();

const http = axios.create({
  baseURL: process.env.FB_GRAPH_URL,
});

module.exports = http;
