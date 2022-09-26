const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const musicsearchRouter = require('./routes/music_search_page');
const favoriteRouter = require('./routes/favorite_page');
const audiobookRouter = require('./routes/audiobook_page');
const sequelize = require('sequelize');



const app = express();

app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



function jwtmake(){
  const jwt = require('jsonwebtoken');
  const token= jwt.sign({
    "sub": 0,
    "pwd":"cneww",
  }, process.env.JWT_SECRET,{
    expiresIn:'48h',
    issuer:'Lee',
  })
  console.log("토큰 생성", token);
  try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(decoded){
    console.log("검증", decoded.sub);
  }
}catch(e){
  console.log(e);
}
};

jwtmake();

app.use('/background-sounds', musicsearchRouter);
app.use('/favorites', favoriteRouter);
app.use('/audiobooks', audiobookRouter);






app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
/*
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});*/