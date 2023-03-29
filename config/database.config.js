const { Sequelize } = require("sequelize")
require('dotenv').config()
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(database, username, password, {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
  logging: false,
});

const testDBConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Successfully connected to the database");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
}

testDBConnection()

module.exports = sequelize