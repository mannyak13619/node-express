const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

try {
  if (process.env.JAWSDB_URL) { 
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        operationsAliases: false,
        logging: function (e) {
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        dialectOptions: {
          socketPath: "/tmp/mysql.sock",
        },
        define: {
          paranoid: true,
        },
      }
    );
  }
} catch (e) {
  console.log("FAILEd:");
  console.log(e);
}

module.exports = sequelize;
