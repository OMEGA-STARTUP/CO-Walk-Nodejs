const jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {
    try {
      const token = req.header("ACCESS_TOKEN");
      const organized_token = token.substr(7);
      req.decoded = jwt.verify(organized_token, process.env.JWT_SECRET);
      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') { // 유효기간 초과
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다',
        });
      }
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다',
      });
    }
}