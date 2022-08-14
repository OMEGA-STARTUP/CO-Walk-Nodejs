const express = require('express');
const http = require('http');
const Music = require('../models/music');
const User = require('../models/user');
const router = express.Router();
const sequelize = require('sequelize');

router.get('/input', async (req, res, next) => {
    try {
        const username = req.query.post_user;
       // const best_music = req.query.post_bestmusic;

      const authCompWords = await Music.create({

            bestmusic:username},

          //  {
              //  where:{ title:best_music}
     //   }
        );
    // const returnData =authCompWords.map((el) => el);

      console.log( authCompWords);
       return res.send( authCompWords);
        
    } catch (error) {
      console.error(error);  
    }
  });









module.exports = router;