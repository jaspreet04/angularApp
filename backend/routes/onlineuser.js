var express = require('express');
var router = express.Router();
const Message = require("../database/models/message");

router.post("/messages", async function (req, res, next) {
    try {
      let userId = req.body.userId;
      await Message.find({ $or: [{ from: userId }, { to: userId }] }).sort({createdAt:1}).then(
        (messages) => res.status(200).send(messages)
      );
    } catch {
      res.status(401).send({ error: "error" });
    }
  });

function generateResponse (status, message){
    return {status , message}
}

module.exports = router;