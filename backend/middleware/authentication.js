const jwt = require("jsonwebtoken");

const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';

const verifyToken = (req, res, next) => {
  try {
  const token =
    req.body.token || req.query.token || req.headers["token"];
  
  if (!token) {
    console.log("no token found")
    throw 'Invalid Token'
  }
  
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next()
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;