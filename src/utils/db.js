const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("desco-meters", "root", "", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
});

exports.sequelize = sequelize;

 