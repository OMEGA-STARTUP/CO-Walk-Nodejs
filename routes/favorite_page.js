const express = require('express');
const http = require('http');
const  models  = require('../models/index');
const sequelize = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./middlewares");
const { Client } = require('pg');
require('dotenv').config();
const env = process.env;

const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT
});
client.connect();

router.get('/', verifyToken, async (req, res, next) => {              //  완료 -> 즐겨찾기페이지(소리데이터 뿌려주기) - jwt토큰 키 결정하기
    try {                                                             // 배열 안에 제이슨
      favorite_music_spread =  await models.background_sound.findAll({
          attributes:['sound_id','sound_name','sound_play_time','sound_img_url'],    
          include:[ {
            model : models.favorite,
            attributes:['sound_id'],
            where:{  user_id : req.decoded.id },
            as:'favorites',
        }],
      });  
    const remake_favorite_music_spread  =  favorite_music_spread.map((el) => {
      const json = el.toJSON();
      delete json['favorites'];
      return json
    });
      return res.status(200).json(remake_favorite_music_spread);    
    } catch (error) {
      console.error(error);  
      res.status(500);
    }
  });

  module.exports = router;