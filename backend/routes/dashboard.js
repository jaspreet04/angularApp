var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';
var _onlineUsers=[];
var _operators=[];
var route = function(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
        console.log('dashboard');
	  res.send("Dashboard")
	});
	io.on('connection', function(client) {
	    console.log('server - connected to socket');
	
		client.on('registeroperator', function(data) {
			//To-Do- add multiple operator support
			operator = {};
			operator.clientId=client.id
			console.log("data>--"+operator);
			console.log(" register operator" + client.id);
            if(!_operators.find(x => x.clientId == data.client))
                _operators.push(operator);  
			console.log(_operators)  	
	    });

	    client.on('addnewuser', function(data) {
            data.clientId=client.id
            if(!_onlineUsers.find(x => x.userId == data.userId))
                _onlineUsers.push(data);
	    	updateOnlineUsers();
	    });

		client.on('message', function(data) {
			console.log(data)
			if(data.to == 'operator'){
				user = _operators[_operators.length-1];
				console.log(_operators)
			}else {
				user = _onlineUsers.find(x => x.userId == data.to)
			}
			console.log(user)
			io.to(user.clientId).emit('message',data)
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
