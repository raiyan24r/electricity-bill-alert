const { DataTypes } = require("sequelize");

const sequelize = require("../utils/db").sequelize;

const Meter = sequelize.define(
  "Meter",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    meter_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "meters",
  }
);

module.exports = Meter;
