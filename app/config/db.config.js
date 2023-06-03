module.exports = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DB,
  dialect: "mysql",
    logging: process.env.QUERY_lOG == 'false' ? false : console.log,
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  };
  