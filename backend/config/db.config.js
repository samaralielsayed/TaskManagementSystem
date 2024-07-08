const dotenv = require("dotenv");
const sql = require("mssql");
dotenv.config();
// SQL Server configuration
const { SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER } = process.env;
var config = {
  user: SQL_USER,
  password: SQL_PASSWORD,
  server: SQL_SERVER,
  database: SQL_DATABASE,

  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

// Connect to SQL Server
sql
  .connect(config)
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

module.exports = sql;
