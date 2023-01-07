const axios = require("axios").default;

const http = axios.create({
  baseURL: process.env.FB_GRAPH_URL,
});

module.exports = http;