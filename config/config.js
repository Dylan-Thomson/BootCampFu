module.exports = {
  development: {
    username: "root",
    password: process.env.LOCAL_DB_PASSWORD,
    database: "exampledb",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.LOCAL_DB_PASSWORD,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    jawsDB: "JAWSDB_URL",
    dialect: "mysql"
  }
};
