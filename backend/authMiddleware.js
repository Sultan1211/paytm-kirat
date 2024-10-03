const JWT_SECRET = require('./config.js');
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({
      msg: "Invalid user"
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decode = jwt.verify(token, JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.json({
        msg: "Invalid user"
      });
    }
  } catch (err) {
    return res.json({
      msg: "Invalid token"
    });
  }
};

module.exports = authMiddleware;
