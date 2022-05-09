const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
 host: process.env.DB_HOST,
 database: "ana_finance",
 username: "root",
 password: "bowie2022",
 dialect: "mysql",
});

User = sequelize.define("users", {
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
 },
 fname: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 lname: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 username: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 }
});

Account = sequelize.define("bank_accounts", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  account_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  route_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  balanceUSD: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  balanceCAN: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  balanceEURO: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
 });

 User.hasMany(Account, {as: 'user'});
 //Account.hasOne(User, {as: 'user'});

 exports.User = User;
 exports.Account = Account;
(async () => {
  await sequelize.sync({ });
  // Code here
})();
//exports.User.sync();