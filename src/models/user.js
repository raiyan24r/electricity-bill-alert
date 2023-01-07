const { DataTypes } = require("sequelize");

const sequelize = require("../utils/db").sequelize;
const Meter = require("./meter");

const User = sequelize.define(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fbid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opted_for_alert: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
  }
);

User.hasMany(Meter, { foreignKey: "user_id" });

module.exports = User;
