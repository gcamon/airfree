"use strict";

//start db connections
require('./mongoose'); 

//init models
require('./models/user.model');
require('./models/client.model');
require('./models/admin.model');
require('./models/super.admin.model');
require('./models/transaction.model');
//require('./controllers');

var express = require('express'),       
  config = require('./config'),    
  route = require('./route'),
  app = express(),
  //router = express.Router(),
  http = require('http').Server(app),
  moment = require('moment'),
  port = process.env.PORT || 3007;


var options = {
  debug: true
}

http.listen(port,function(){
    console.log('listening on *: ' + port);
});


config(app);
route(app)
 





