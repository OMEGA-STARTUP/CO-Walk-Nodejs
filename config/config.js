require('dotenv').config();
const env = process.env;

  development= {
    username:  process.env.DATABASE_USER,
    password: process.env. DATABASE_PASSWORD,
    database:  process.env.DATABASE_NAME,
    host:  process.env.DATABASE_HOST,
    dialect: 'postgres'
  },
  test = {
    username:  process.env.DATABASE_USER,
    password: process.env. DATABASE_PASSWORD,
    database:  process.env.DATABASE_NAME,
    host:  process.env.DATABASE_HOST,
    dialect: 'postgres'
  },
  production= {
    username:  process.env.DATABASE_USER,
    password: process.env. DATABASE_PASSWORD,
    database:  process.env.DATABASE_NAME,
    host:  process.env.DATABASE_HOST,
    dialect: 'postgres'
  }
  module.exports = { development, production, test };