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

router.get('/',verifyToken, async (req, res, next) => {    //  완료 -> 오디오북 페이지(오디오북 뿌려주기)테스트 완료
try {
const audio_book_title_of_users = await models.audio_book.findAll({
attributes:['audio_book_title'],
where: { user_id: req.decoded.sub },
});
console.log(audio_book_title_of_users);
return res.status(200).json({audio_book_title_of_users,  "code": 200});
}
catch (error) {
console.error(error);  
res.status(500).json({ "code": 500 });
}
});

router.route('/:audio_book_title')
.get( verifyToken, async (req, res, next) => {              //  완료 -> 오디오북페이지(오디오북 내 노래 조회)테스트 완료 
  try {              
      const audiobook_title = req.params.audio_book_title;
                                                              
      select_audiobook_sounds = await models.audio_sound_playlist.findAll({
          attributes:['sound_id'],
          where: { 
          audio_book_title: audiobook_title,
          user_id: req.decoded.sub  
          }
          });
          return res.status(200).json({select_audiobook_sounds, "code": 200});

    } catch (error) {
      console.error(error);  
      res.status(500).json({ "code": 500 });
    }
})

.post( verifyToken, async (req, res, next) => {              //  완료 오디오북페이지(오디오북 만들기)테스트 완료
    try {              
        const audiobook_title = await req.params.audio_book_title;

      
        await  models.audio_book.create({
            audio_book_title: audiobook_title,
            user_id: req.decoded.sub,
            });
          return res.status(200).json({ "code":200,  "message":"ok",});
      } catch (error) {
        console.error(error);  
        return res.status(400).json({ "code": 400 ,"message":"already exist"});
      }
  })

  .delete( verifyToken, async (req, res, next) => {              //  완료 오디오북페이지(오디오북 삭제)테스트 완료
    try {              
        const audiobook_title = await req.params.audio_book_title;
     
        await models.audio_book.destroy({
           where:{ audio_book_title: audiobook_title,
            user_id: req.decoded.sub,}      
            });
            return res.status(200).json({ "code":200,  "message":"ok",});
      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  })

  .put(verifyToken, async (req, res, next) => {              //  오디오북페이지(오디오북 이름 바꾸기)테스트 완료
    try {              
        const audiobook_title = req.params.audio_book_title;
        const revised_title = req.body.revised_audio_book_title;

        select_audiobook_sounds = await models.audio_book.update({
          audio_book_title: revised_title },
          {  where: { user_id: req.decoded.sub, audio_book_title: audiobook_title}
            });
            return res.status(200).json({ "code":200,  "message":"ok",});
      } catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
      }
  });
 
router.route('/:audio_book_title/background-sounds/:sound_id')
   .post(verifyToken, async (req, res, next) => {              // 완료 오디오북페이지(오디오북 노래추가)테스트 완료
    try {              
        const audiobook_title = await req.params.audio_book_title;
        const audiobook_sound_id = await req.params.sound_id;
     
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
  })

  .put(verifyToken, async (req, res, next) => {              //  완료 -> 오디오북페이지(오디오북 내 노래 삭제) 테스트 완료
    try {              
        const audiobook_title = await req.params.audio_book_title;
        const audiobook_sound_id = await req.params.sound_id;
     
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

  router.get('/:audio_book_title/background-sounds/:background_sound_id/play',  verifyToken,async (req, res, next) => {    //  완료,,? -> 오디오북페이지(소리재생)(테스트 이상함)
 
        const background_sound_id =  await req.params.background_sound_id;
        const audio_book_title = await req.params.audio_book_title;
  try {
        const selected_sound_id = await models.audio_sound_playlist.findAll({
        attributes:['sound_id'],
        where: {user_id: req.decoded.sub, audio_book_title: audio_book_title  },
        });
      const  selected_sound_id_list = selected_sound_id.map((el) => el.sound_id);
  
      console.log(background_sound_id);
      console.log( selected_sound_id_list);
 
     
      if(selected_sound_id_list.includes(background_sound_id)){

        const selected_sound_id_imformation = await models.background_sound.findAll({
          attributes:['sound_id','sound_play_url','stepping_sounds'],
          where: { sound_id:  background_sound_id },
          });
          
          console.log(selected_sound_id_imformation);
          return res.status(200).json({selected_sound_id_imformation, "code": 200});
      } 
      else{
        return res.status(404).json({ "code": 404 ,"message":"해당 값 없음"});
      }   
        }
        catch (error) {
        console.error(error);  
        res.status(500).json({ "code": 500 });
        }
});

  module.exports = router;