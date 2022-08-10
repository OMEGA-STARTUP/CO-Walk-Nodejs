const express = require('express');
const http = require('http');
const Music = require('../models/music');
const router = express.Router();
const sequelize = require('sequelize');

router.get('/', async (req, res, next) => {
  const Op = sequelize.Op;
  const get_title = req.query.post_title;

  if(!get_title){
    return res.render('input');
  }
  try {
   
    const authCompWords = await Music.findAll({
        where: { title: { [Op.like]: '%' + get_title + '%' } },
      });
      const returnData = authCompWords.map((el) => el.title);
      console.log(returnData);
      return res.send(returnData);
      
  } catch (error) {
    console.error(error);
  
  }
});

module.exports = router;