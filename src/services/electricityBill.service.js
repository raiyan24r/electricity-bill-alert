const descoHttp = require("../utils/http").descoHttp;

async function getBalanceByAccount(accountNo) {
  const response = await descoHttp.get("/getBalance?accountNo=" + accountNo);
  return response.data.data;
}
async function getBalanceByMeter(meterNo) {
  const response = await descoHttp.get("/getBalance?meterNo=" + meterNo);
  return response.data;
}

module.exports = {
  getBalanceByAccount,
  getBalanceByMeter,
};
