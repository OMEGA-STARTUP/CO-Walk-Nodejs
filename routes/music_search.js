const express = require('express');
const http = require('http');
const  models  = require('../models/index');
const Sequelize = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./middlewares");


router.get('/',verifyToken, async (req, res, next) => {
  try {
    
 

    const favorite_user = await  models.BACKGROUND_SOUND.findAll({         //favorite 테이블에서 인코드한 user데이터 가져오기
      attributes:['id'],
      where: { user_id :  req.decoded  },
     });

    const background_sounds = await models.FAVORITE.findAll({           
        attributes:['id','name','sound_play_time','sound_img_url']
      });

    
      const returnData =background_sounds.map((el) => el);
      console.log(returnData);
      return res.status(200).json(returnData);
    
  } catch (error) {
    console.error(error);  
    res.status(500);
  }
});



router.get('/:background-sound-name/search', async (req, res, next) => {
  const Op = sequelize.Op;
  const get_title = req.params.background-sound-name;

  get_title0 = get_title.replace(" ", "%"); 
          //검색의 띄어쓰기 해결 맨 앞 제목 한번만 가능
  try {
    const authCompWords = await  models.BACKGROUND_SOUND.findAll({
      attributes:['id','name','sound_play_time','sound_img_url'],
        where: { title : { [Op.like]: '%' + get_title0 + '%' } },
      });
      const returnData =authCompWords.map((el) => el);
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
    const authCompWords = await Music.findAll({
       attributes:['id','name','sound_play_time','sound_img_url'],
       where: { name:  get_title  },
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





