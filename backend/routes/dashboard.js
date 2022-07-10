var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const JWT_SECRET = "DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV";
const Message = require("../database/models/message");
const OnlineUsers = require("../database/models/onlineUsers");
const user = require("../database/models/user");
const { on } = require("nodemon");
var _onlineUsers = [];
var _operators = [];
var route = function (io) {
  /* GET users listing. */
  router.get("/", function (req, res, next) {
    console.log("dashboard");
    res.send("Dashboard");
  });

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

  io.on("connection", function (client) {
    console.log("server - connected to socket");

    client.on("registeroperator", async function (data) {
      //To-Do- add multiple operator support
      operator = {};
      operator.clientId = client.id;
      const sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);
      console.log(sockets)
      let onlineuser = await OnlineUsers.find( { "clientId": { $in: sockets } } ).catch((err) => console.log("ddddddddddddderr"));
      if(onlineuser.length != 0)
        _onlineUsers.push(onlineuser);
      updateOnlineUsers();
      console.log(" register operator" + client.id);
      if (!_operators.find((x) => x.clientId == data.client))
        _operators.push(operator);
      console.log(_operators);
    });

    client.on("addnewuser", function (data) {
      data.clientId = client.id;
      OnlineUsers.updateOne(data,{ upsert : true }).catch((err) => console.log(err));
      console.log(data);
      if (!_onlineUsers.find((x) => x.userId == data.userId))
        _onlineUsers.push(data);
      updateOnlineUsers();
    });

    client.on("message", function (data) {
      console.log(data);
      let user;
      if (data.to == "operator") {
        user = _operators[_operators.length - 1];
        console.log("to operator");
      } else {
        user = _onlineUsers.find((x) => x.userId == data.to);
        console.log("from");
      }
      console.log(user);
      Message.create(data).catch((err) => console.log(err));
      io.to(user.clientId).emit("message", data);
    });

    client.on("disconnect", function () {
      console.log("userid disconnected");

      _onlineUsers = _onlineUsers.filter((user) => user.clientId != client.id);
      updateOnlineUsers();
    });

    function updateOnlineUsers() {
      io.emit("updateusers", _onlineUsers);
    }
  });

  return router;
};

module.exports = route;
