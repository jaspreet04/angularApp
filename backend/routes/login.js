var express = require('express');
var router = express.Router();
const User = require("../database/models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';
/* GET home page. */
router.post('/', async (req, res,) => {
  const { email, password } = req.body;

  const user = await User.findOne({email}).lean()
  
  if(!user){
    res.status(401).send(generateResponse("error", 'invalid user'));
  } else {
    if(await bcrypt.compare(password, user.password)){
      let jwtBearerToken = jwt.sign({userId : user._id, userName: user.username},JWT_SECRET)

      res.send(generateResponse("ok", jwtBearerToken));
    }else {
      res.status(401).send(generateResponse("error", "error"));
    }

  }
  
});

function generateResponse (status, message){
    return {status , message}
}

module.exports = router;