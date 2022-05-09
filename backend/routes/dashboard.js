var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';
var _onlineUsers=[];
var _onlineUsers2={};
var route = function(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
        console.log('dashboard');
	  res.send("Dashboard")
	});
	io.on('connection', function(client) {
	    console.log('server - connected to socket');
	    client.on('addnewuser', function(data) {
            
            if(!_onlineUsers.find(x => x.userId == data.userId))
                _onlineUsers.push(data);
          // _onlineUsers2[client.id] = data;
          // console.log(_onlineUsers2)
	    	updateOnlineUsers();
	    	
	    });

      client.on("disconnect", function (userid) {
        console.log("userid disconnected")
        console.log(client.id);

        _onlineUsers = _onlineUsers.filter(user => user.userId != userid)
        updateOnlineUsers();
      });

      function updateOnlineUsers(){
	    	io.emit('updateusers', _onlineUsers);
    	}

	});

	return router;
};

module.exports = route;
