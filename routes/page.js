const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const jwt = require('jsonwebtoken');
    const token= jwt.sign({
      "sub": 0,
      "pwd":"cneww",
    }, process.env.JWT_SECRET,{
      expiresIn:'60m',
      issuer:'Lee',
    })
    console.log("토큰 생성", token);
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){
      console.log("검증", decoded.user_id);
    }
  }catch(e){
    console.log(e);
  }
  return res.render('input');
});

module.exports = router;