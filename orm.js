require('dotenv').config();
const env = process.env;

const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto( process.env.DATABASE_NAME, process.env.DATABASE_USER,  process.env.DATABASE_PASSWORD,{
  host: process.env.DATABASE_HOST,
  port:'5432',
  dialect: "postgres"
});
auto.run((err)=>{
  if(err) throw err;
})