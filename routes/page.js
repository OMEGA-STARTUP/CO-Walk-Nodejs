const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  
  return res.render('input');
});

module.exports = router;