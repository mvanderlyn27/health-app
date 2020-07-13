require('dotenv').config();
module.exports=
{
  "development": {
    "username": process.env.DB_USER? process.env.DB_USER:'user',
    "password": process.env.DB_PASS? process.env.DB_PASS: 'pass',
    "database": process.env.DB_NAME? process.env.DB_NAME: 'health-app-db',
    "host": "postgres",
    "dialect": process.env.DB_DIALECT? process.env.DB_DIALECT:'postgres'
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "postgres",
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "postgres",
    "dialect": process.env.DB_DIALECT
  }
}

