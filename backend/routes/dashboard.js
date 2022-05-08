var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';
var _onlineUsers={};

var route = function(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
        console.log('dashboard');
	  res.send("Dashboard")
	});
	io.on('connection', function(client) {
	    console.log('server - connected to socket');
	    client.on('addnewuser', function(data) {
			console.log(data);
            if(data.userid in _onlineUsers){
				
	    	}else{
	    		updateOnlineUsers(data);
	    	}
	    });

        function updateOnlineUsers(data){
	    	_onlineUsers[data.userid] = data;
	    	io.emit('updateusers', _onlineUsers);
    	}

	});

	return router;
};

module.exports = route;
