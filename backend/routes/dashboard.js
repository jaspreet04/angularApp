var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';
var _onlineUsers=[];
var _onlineUsers2=[];
var route = function(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
        console.log('dashboard');
	  res.send("Dashboard")
	});
	io.on('connection', function(client) {
	    console.log('server - connected to socket');
	    client.on('addnewuser', function(data) {
            data.clientId=client.id
            if(!_onlineUsers.find(x => x.userId == data.userId))
                _onlineUsers.push(data);
	    	updateOnlineUsers();
	    	
	    });

		client.on('message', function(data) {
			user = _onlineUsers.find(x => x.userId == data.to)
			io.to(user.clientId).emit(data.message)
	    });

      client.on("disconnect", function () {
        console.log("userid disconnected")

        _onlineUsers = _onlineUsers.filter(user => user.clientId != client.id)
        updateOnlineUsers();
      });

      function updateOnlineUsers(){
	    	io.emit('updateusers', _onlineUsers);
    	}

	});

	return router;
};

module.exports = route;
