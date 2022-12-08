const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('TOken not valid');
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('you are not authorized');
  }
};
const verifyTokenAuth = (req, res) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not authorized');
    }
  });
};
const verifyTokenAdmin = (req, res) => {
  verifyToken(req, res, () => {
    if ( req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not authorized');
    }
  });
};



module.exports = { verifyToken, verifyTokenAuth ,verifyTokenAdmin};
