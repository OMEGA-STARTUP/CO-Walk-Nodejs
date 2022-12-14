const express = require('express');
const  models  = require('../models/index');
const sequelize = require('sequelize');
const router = express.Router();
const { verifyToken } = require("./middlewares");
const { Client } = require('pg');
require('dotenv').config();
const env = process.env;

  const client = new Client({
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT
});

client.connect();


router.get('/',verifyToken, async (req, res, next) => {               //완성 -> 소리페이지(소리데이터 뿌려주기) 테스트 완료
  try {                                                               // 배열 안에 제이슨형식
    
    background_sounds =await client.query(`select bs.sound_id as sound_id, bs.sound_name as sound_name, bs.sound_play_time as sound_play_time, bs.sound_img_url as sound_img_url, bs.sound_play_url as sound_play_url, bs.sound_src_url as sound_src_url, CASE WHEN f.user_id is null THEN false else true end isFavorite from (select * from favorite where user_id = ${ req.decoded.sub }) f right outer join background_sound bs on f.sound_id = bs.sound_id; `);

    console.log(background_sounds);
    return res.status(200).json(background_sounds.rows);  

  } catch (error) {
      console.error(error);  
      res.status(500).json({
      "code":500,
      });
  }
});

router.get('/:background_sound_name/search',verifyToken, async (req, res, next) => {    //완성 -> 소리페이지(소리검색) 테스트 완료
    const Op = sequelize.Op;                                                    // 배열의 배열에 제이슨형식
    const get_title = req.params.background_sound_name;
    related_search_title = get_title.replace(" ", "%");                        //검색의 띄어쓰기 해결 맨 앞 제목 한번만 가능 
       
    try{   
        const [background_sounds, user_id] = await Promise.all([models.background_sound.findAll({
            attributes:['sound_id','sound_name','sound_play_time','sound_img_url'],
              where: { sound_name : { [Op.like]: '%' + related_search_title + '%' } } 
            }),
            models.favorite.findAll({
                attributes:['sound_id','user_id'],
                where :{ user_id : req.decoded.sub },
            })
          ]);

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
      if(result_value == "" || result_value == null || result_value == undefined || ( result_value!= null && typeof result_value == "object" && !Object.keys(result_value).length))
          {
                return res.status(404).json({"code": 404, "message":"no result"});
          }

          return res.status(200).json({result_value, "code": 200});
      } catch (error) {
          console.error(error);  
          res.status(500).json({ "code": 500 });
      }
    });


router.get('/:background_sound_id/play', async (req, res, next) => {    //  완료 -> 즐겨찾기페이지(소리재생)테스트 완료
                                                                            // 리스트 안에 제이슨
    const background_sound_id = parseInt(req.params.background_sound_id);
    try {
    const play_information = await models.background_sound.findAll({
    attributes:['sound_id','sound_play_url','stepping_sounds'],
    where: { sound_id:  background_sound_id },
    });
    console.log(play_information);
    return res.status(200).json({play_information, "code": 200});
    }
    catch (error) {
    console.error(error);  
    res.status(500).json({ "code": 500 });
    }
    });

router.post('/:background_sound_id/favorite', verifyToken, async (req, res, next) => {     //  완료 -> 소리찾기(즐겨찾기(추가,삭제))테스트 완료      
    const get_title = parseInt(req.params.background_sound_id);        //   소리 아이디 받아오기     
    const is_favorite = req.body.is_favorite;   
    try {
    if(is_favorite === "true"){
      await models.favorite.create({
        user_id: req.decoded.sub,
        sound_id: get_title,
        });
    }
    else if(is_favorite === "false"){
      await models.favorite.destroy({    
      where:{ user_id: req.decoded.sub , sound_id: get_title},      
        });
    }
    return res.status(200).json({ "code": 200, "message":"ok", });
    }
    catch (error) {
      console.error(error);  
      res.status(500).json({ "code": 500 });
    }
  });

module.exports = router;



    
