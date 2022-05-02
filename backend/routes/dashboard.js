var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';

/* GET home page. */
router.post("/", async(req, res) => {
  
});

function generateResponse (status, message){
    return {status , message}
}


module.exports = router;
