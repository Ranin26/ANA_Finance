const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
 host: "localhost",
 database: "ana_finance",
 username: "root",
 password: "",
 dialect: "mysql",
});

exports.User = sequelize.define("users", {
 // Model attributes are defined here
 id: {
   type: DataTypes.INTEGER,
   autoIncrement: true,
   allowNull: false,
   primaryKey: true,
 },
 email: {
   type: DataTypes.STRING,
   unique: true,
   allowNull: false,
 },
 password: {
   type: DataTypes.STRING,
   allowNull: false,
   unique: true,
 },
});

exports.User.sync();