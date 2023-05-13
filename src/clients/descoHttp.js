const axios = require("axios");
const dotenv = require("dotenv").config();

const descoHttp = axios.create({
  baseURL: process.env.DESCO_API_URL,
});

async function getBalanceByAccount(accountNo) {
  const response = await descoHttp.get("/getBalance?accountNo=" + accountNo);
  return response.data.data;
}

async function getBalanceByMeter(meterNo) {
  const response = await descoHttp.get("/getBalance?meterNo=" + meterNo);
  return response.data;
}

module.exports = {
  descoHttp,
};
