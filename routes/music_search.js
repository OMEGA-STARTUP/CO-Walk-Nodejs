const express = require('express');
const http = require('http');
const Music = require('../models/music');
const router = express.Router();
const sequelize = require('sequelize');


router.get('/', async (req, res, next) => {
  try {
    const authCompWords = await Music.findAll({
       attributes:['title','img','backgroung_url']
      });
      const returnData =authCompWords.map((el) => el);

      console.log(returnData);
      return res.send(returnData);
    
  } catch (error) {
    console.error(error);  
  }
});

router.get('/:background-sound-name/search', async (req, res, next) => {
  const Op = sequelize.Op;
  const get_title = req.params.background-sound-name;

  get_title = get_title.replace(" ", "%"); 
          //검색의 띄어쓰기 해결 맨 앞 제목 한번만 가능
  try {
    const authCompWords = await Music.findAll({
        where: { title: { [Op.like]: '%' + get_title + '%' } },
      });
      const returnData =authCompWords.map((el) => el);
      if(returnData == ""){
        return res.send("404");  //해당 값이 없다는거임
      }
      console.log(returnData);
      return res.send(returnData);
    
  } catch (error) {
    console.error(error);  
  }
});

router.get('/:background-sound-id/play', async (req, res, next) => {
  const Op = sequelize.Op;
  const get_title = req.params.background-sound-id;
 
  try {
    const authCompWords = await Music.findAll({
       attributes:['title','img','backgroung_url'],
       where: { title:  get_title  },
      });
      const returnData =authCompWords.map((el) => el);

      console.log(returnData);
      return res.send(returnData);
  }
 catch (error) {
    console.error(error);  
  }
});











module.exports = router;





