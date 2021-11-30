// {
//   "development": {
//     "username": "postgres",
//     "password": "rootuser",
//     "database": "Property-Pro-Lite",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "postgres",
//     "password": "rootuser",
//     "database": "Property-Pro-Lite",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": "postgres",
//     "password": "rootuser",
//     "database": "Property-Pro-Lite",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   }
// }
require("dotenv").config();
const { Sequelize } = require("sequelize");
const isTestEnv = process.env.NODE_ENV === "test";
const db = new Sequelize(
  isTestEnv ? process.env.TESTDBNAME : process.env.DATABASENAME,
  process.env.DATABASEUSERNAME,
  process.env.DATABASEPASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default db;
