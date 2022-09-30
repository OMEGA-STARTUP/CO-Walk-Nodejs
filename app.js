const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const musicsearchRouter = require('./routes/music_search_page');
const favoriteRouter = require('./routes/favorite_page');
const audiobookRouter = require('./routes/audiobook_page');
const healthCheckRouter = require('./routes/health_check');

const app = express();

app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/background-sounds', musicsearchRouter);
app.use('/favorites', favoriteRouter);
app.use('/audiobooks', audiobookRouter);
app.use('/node/health-check', healthCheckRouter);

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