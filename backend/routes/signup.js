var express = require("express");
var router = express.Router();
const User = require("../database/models/user");
const bcrypt = require('bcrypt');
const { response } = require("../app");
const saltRounds = 10;
/* GET home page. */
router.post("/", async(req, res) => {
const { email, password, username } = req.body;
 const passwordHash = await bcrypt.hash(password , saltRounds);

  try {
    await User.create({
        username,
        email,
        password : passwordHash
    })
    .then(user => res.send(user))
  } catch (error) {
    res.send(generateResponse("error", error.message));
  }
 
  res.send(generateResponse("ok", "User Added Sucessfully"));
  
});

function generateResponse (status, message){
    return {status , message}
}


module.exports = router;
