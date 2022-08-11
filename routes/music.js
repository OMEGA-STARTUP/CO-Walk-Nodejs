const express = require('express');
const http = require('http');
const Music = require('../models/music');
const router = express.Router();
const sequelize = require('sequelize');


router.get('/', async (req, res, next) => {
  try {
    const authCompWords = await Music.findAll({
       attributes:['title']
      });
      const returnData =authCompWords.map((el) => el.title);
      console.log(returnData);
      return res.send(returnData);
    
  } catch (error) {
    console.error(error);  
  }
});
module.exports = router;



/*
router.get('/', async (req, res, next) => {
  const Op = sequelize.Op;
  const get_title0 = req.query.post_title;
  if(!get_title0){
    return res.redirect('input');
  }
  get_title = get_title0.replace(" ", "%"); 
          //검색의 띄어쓰기 해결 맨 앞 제목 한번만 가능
  try {
    const authCompWords = await Music.findAll({
        where: { title: { [Op.like]: '%' + get_title + '%' } },
      });
      const returnData =authCompWords.map((el) => el.title);
      console.log(returnData);
      return res.send(returnData);
    
  } catch (error) {
    console.error(error);  
  }
});

module.exports = router;
*/