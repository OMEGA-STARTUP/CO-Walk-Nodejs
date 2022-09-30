require('dotenv').config();
const env = process.env;

  development= {
    username:  env.DATABASE_USER,
    password: env. DATABASE_PASSWORD,
    database:  env.DATABASE_NAME,
    host:  env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: 'postgres',
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  },
  test = {
    username:  env.DATABASE_USER,
    password: env. DATABASE_PASSWORD,
    database:  env.DATABASE_NAME,
    host:  env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: 'postgres',
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  },
  production= {
    username:  env.DATABASE_USER,
    password: env. DATABASE_PASSWORD,
    database:  env.DATABASE_NAME,
    host:  env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: 'postgres',
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  }
  module.exports = { development, production, test };