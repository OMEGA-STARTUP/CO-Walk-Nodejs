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
const Sequelize = require('sequelize');

  const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT
});

client.connect();


router.get('/',verifyToken, async (req, res, next) => {               //완성 -> 소리페이지(소리데이터 뿌려주기) - jwt토큰 키 결정하기
  try {                                                               // 배열 안에 제이슨형식
    

background_sounds =await client.query(`select bs.sound_id as sound_id, bs.sound_name as sound_name, bs.sound_play_time as sound_play_time, bs.sound_img_url as sound_img_url, bs.sound_play_url as sound_play_url, bs.sound_src_url as sound_src_url, CASE WHEN f.user_id is null THEN false else true end isFavorite from (select * from favorite where user_id = ${ req.decoded}) f right outer join background_sound bs on f.sound_id = bs.sound_id; `);
    //const returnData =background_sounds.map((el) => el);
    console.log(background_sounds);
    return res.status(200).json(background_sounds.rows);  
  } catch (error) {
    console.error(error);  
    res.status(500);
  }
});

router.get('/:background-sound-name/search',verifyToken, async (req, res, next) => {                             //완성 -> 소리페이지(소리검색) - jwt토큰 키 결정하기
  const Op = sequelize.Op;                                                    // 배열의 배열에 제이슨형식
  const get_title = req.params.background-sound-name;
  related_search_title = get_title.replace(" ", "%");                        //검색의 띄어쓰기 해결 맨 앞 제목 한번만 가능 
          
try{   
    const background_sounds = await  models.background_sound.findAll({
      attributes:['sound_id','sound_name','sound_play_time','sound_img_url'],
        where: { sound_name : { [Op.like]: '%' + related_search_title + '%' } },
      });
    const user_id = await models.favorite.findAll({
      attributes:['sound_id','user_id'],
      where :{ user_id : req.decoded.id },
    });
    const  background_sounds_sound_id = background_sounds.map((el) => el.sound_id);
    const  user_id_sound_id = user_id.map((el) => el.sound_id);
    var result_value = [];
    
for(var i of background_sounds_sound_id){
   if(user_id_sound_id.includes(i)){
      const same_sound_id = await models.background_sound.findAll({
        attributes:['sound_id','sound_name',"sound_play_time","sound_img_url"],
        where: { sound_id: i },
      });  
    const remake_favorite_music_spread  = same_sound_id.map((el) => {
      const json = el.toJSON();
      json.isfavorite='true';
      return json
    });
    result_value.push(remake_favorite_music_spread );
   }
  else{
      const different_sound_id = await models.background_sound.findAll({
        attributes:['sound_id','sound_name',"sound_play_time","sound_img_url"],
        where: { sound_id: i },
      }); 
      const remake_favorite_music_spread  = different_sound_id.map((el) => {
        const json = el.toJSON();
        json.isfavorite='false';
        return json
      });
      result_value.push(remake_favorite_music_spread);   
  }
}
if(result_value == ""){
        return res.status("404");              //해당 값이 없다는거임
      }
      return res.status(200).json(result_value);
  } catch (error) {
    console.error(error);  
    res.status(500);
  }
});





router.get('/:background-sound-id/play', async (req, res, next) => {    //완성 -> 소리페이지(소리재생)
  const Op = sequelize.Op;                                              // 리스트 안에 제이슨
 const get_title = req.params.background-sound-id;

  try {
    const authCompWords = await models.background_sound.findAll({
       attributes:['sound_id','sound_play_url','stepping_sounds'],
       where: { sound_id:  get_title  },
      });
      const returnData =authCompWords.map((el) => el);

      console.log(returnData);
      return res.status(200).json(returnData);
  }
 catch (error) {
    console.error(error);  
    res.status(500);
  }
});



router.get('/:background-sound-id/favorite', verifyToken, async (req, res, next) => {     //  완료 -> 소리찾기(즐겨찾기(추가,삭제))      
  const get_title = parseInt(req.params.background-sound-id);        //   소리 아이디 받아오기     
  const bool = req.params.bool;   //어디로 불린값 주는지 물어보기?
  try {
  if(bool === true){
   await models.favorite.create({
     // user_id: req.decoded.name,
      user_id: 2,
      sound_id: get_title,
    });
  }
  else if(bool === false){
   await models.favorite.destroy({    
   where:{ user_id: req.decoded.id , sound_id: get_title},     //req.decoded.? 인지 물어보기 
    });
  }
  return res.status(200);
  }
 catch (error) {
    console.error(error);  
    res.status(500);
  }
});

module.exports = router;





