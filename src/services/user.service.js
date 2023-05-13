const User = require("../models/user");
const messengerAppService = require("./messengerApp.service");

exports.createNew = async (userInfo) => {
  const user = {
    fbid: userInfo.id,
    name: userInfo.first_name + " " + userInfo.last_name,
  };
  return await User.create(user);
};
