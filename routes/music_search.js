const express = require('express');
const http = require('http');
const  models  = require('../models/index');
const sequelize = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./middlewares");
const { Client } = require('pg');


const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'cn37rqww',
    port: 5432
})
client.connect();


router.get('/',verifyToken, async (req, res, next) => {
  try {
    

background_sounds =await client.query(`select bs.sound_id as sound_id, bs.sound_name as sound_name, bs.sound_play_time as sound_play_time, bs.sound_img_url as sound_img_url, bs.sound_play_url as sound_play_url, bs.sound_src_url as sound_src_url, CASE WHEN f.user_id is null THEN false else true end isFavorite from (select * from favorite where user_id = ${ req.decoded}) f right outer join background_sound bs on f.sound_id = bs.sound_id; `);

    //const returnData =background_sounds.map((el) => el);
    console.log(background_sounds);
    return res.status(200).json(background_sounds.rows);
    
  } catch (error) {
    console.error(error);  
    res.status(500);
  }
});

//:background-sound-name


router.get('/search', async (req, res, next) => {
  const Op = sequelize.Op;
  const get_title = req.query.post_title;
  get_title0 = get_title.replace(" ", "%"); 
          //검색의 띄어쓰기 해결 맨 앞 제목 한번만 가능
  const id =0;
try{   
    const authCompWords = await  models.background_sound.findAll({
      attributes:['sound_id','sound_name','sound_play_time','sound_img_url'],
        where: { sound_name : { [Op.like]: '%' + get_title0 + '%' } },
      });

    const user_id = await models.favorite.findAll({
      attributes:['sound_id','user_id'],
      where :{ user_id : 0},
    });




      //const b=0;
  //const returnData =authCompWords.map((el) => el);
  //get_title1 = await client.query(`select ${authCompWords}.sound_id as sound_id, ${authCompWords}.sound_name as sound_name, ${authCompWords}.sound_play_time as sound_play_time, ${authCompWords}.sound_img_url as sound_img_url, CASE WHEN f.user_id is null THEN false else true end isFavorite from (select * from favorite where user_id = ${ b}) f right outer join background_sound bs on f.sound_id = ${authCompWords}.sound_id; `);


      if(returnData == ""){
        return res.status("404");  //해당 값이 없다는거임
      }
      console.log(returnData);
      return res.status(200).json(returnData);
    
  } catch (error) {
    console.error(error);  
    res.status(500);
  }
});





router.get('/:background-sound-id/play', async (req, res, next) => {
  const Op = sequelize.Op;
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



module.exports = router;





