
const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('pratice','postgres','cn37rqww@',{
  host:'127.0.0.1',
  port:'5432',
  dialect: "postgres"
});
auto.run((err)=>{
  if(err) throw err;
})