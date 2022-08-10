const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const Music = require('../models/music');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const Op = sequelize.Op;
    const title = req.query.query;
    const authCompWords = await Music.findAll({
        where: { wordName: { [Op.like]: '%' + title + '%' } },
      });
      const returnData = authCompWords.map((el) => el.wordName);
      res.status(200).json({
        data: returnData,
      });
  } catch (error) {
    console.error(error);
  
  }
});

module.exports = router;