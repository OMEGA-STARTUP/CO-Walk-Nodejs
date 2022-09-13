const express = require('express');
const http = require('http');
const  models  = require('../models/index');
const sequelize = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./middlewares");
const { Client } = require('pg');
const { equal } = require('assert');
const { title } = require('process');
require('dotenv').config();
const env = process.env;
const client = new Client({
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    port: env.PORT
});
client.connect();

router.post('/:audio-book-title', verifyToken, async (req, res, next) => {              //  완료 오디오북페이지(오디오북 만들기) - jwt토큰 키 결정하기
    try {              
        const audiobook_title = req.params.audio-book-title;
                                                                   // 배열 안에 제이슨
        await  models.audio_book.create({
            audio_book_title: audiobook_title,
            user_id: req.decoded.sub,
            });

      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  });
 
  router.get('/:audio-book-title', verifyToken, async (req, res, next) => {              //  오디오북페이지(오디오북 내 노래 조회) - jwt토큰 키 결정하기
    try {              
        const audiobook_title = req.params.audio-book-title;
                                                                
        select_audiobook_sounds = await models.audio_sound_playlist.findAll({
            attributes:[''],
            where: { 
            audio_book_title: audiobook_title,
            user_id: req.decoded.sub  
            }
            });
      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  });

  router.post('/:audio-book-title/background-sounds/:sound-id', verifyToken, async (req, res, next) => {              // 완료 오디오북페이지(오디오북 노래추가) - jwt토큰 키 결정하기
    try {              
        const audiobook_title = await req.params.audio-book-title;
        const audiobook_sound_id = await req.params.sound-id;
     
        await  models.audio_sound_playlist.create({
            audio_book_title: audiobook_title,
            sound_id: audiobook_sound_id,
            user_id: req.decoded.sub,
            order_numb: 0,      
            });
        return res.status(200).json({ "code":200,  "message":"ok",});
      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  });

  router.delete('/:audio-book-title', verifyToken, async (req, res, next) => {              //  완료 오디오북페이지(오디오북 삭제 ) - jwt토큰 키 결정하기
    try {              
        const audiobook_title = await req.params.audio-book-title;
     
        await models.audio_book.destroy({
           where:{ audio_book_title: audiobook_title,
            user_id: req.decoded.sub,}      
            });
            return res.status(200).json({ "code":200,  "message":"ok",});
      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  });

  router.put('/:audio-book-title/background-sounds/:sound-id', verifyToken, async (req, res, next) => {              //  완료 오디오북페이지(오디오북 내 노래 삭제) - jwt토큰 키 결정하기
    try {              
        const audiobook_title = await req.params.audio-book-title;
        const audiobook_sound_id = await req.params.sound-id;
     
        await  models.audio_sound_playlist.destroy({
            where:{audio_book_title: audiobook_title,
            sound_id: audiobook_sound_id,
            user_id: req.decoded.sub,  }  
            });
        return res.status(200).json({ "code":200,  "message":"ok",});
      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  });

  router.put('/:audio_book_title', verifyToken, async (req, res, next) => {              //  오디오북페이지(오디오북 내 노래 조회) - jwt토큰 키 결정하기
    try {              
        const audiobook_title = req.params.audio_book_title;
        const revised_title = req.body.revised_title;

        select_audiobook_sounds = await models.audio_book.update({
          audio_book_title: revised_title },
          {  where: { user_id: req.decoded.sub,audio_book_title: audiobook_title}
            });
            return res.status(200).json({ "code":200,  "message":"ok",});
      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  });

  router.get('/:audio_book_title/background-sounds/:background_sound_id/play', async (req, res, next) => {    //  완료 -> 즐겨찾기페이지(소리재생)
    // 리스트 안에 제이슨
const background_sound_id = parseInt(req.params.background_sound_id);
const audio_book_title = req.params.audio_book_title;
try {
const authCompWords = await models.background_sound.findAll({
attributes:['sound_id','sound_play_url','stepping_sounds'],
where: { sound_id:  background_sound_id },
});
const returnData =authCompWords.map((el) => el);
console.log(returnData);
return res.status(200).json(returnData);
}
catch (error) {
console.error(error);  
res.status(500).json({ "code": 500 });
}
});



  module.exports = router;