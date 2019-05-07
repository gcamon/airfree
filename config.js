'use strict';
require('dotenv').config();
var express = require('express');
var pathExp = require("path");
var multer = require('multer');
var bodyParser = require('body-parser');
//var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model("User");
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);


module.exports = function(app) {
  var storeDB = "mongodb://127.0.0.1:27017/airfreedb";
  var store = new MongoDBStore(
    {
      uri: storeDB,
      collection: 'mySessions'
  });

 	store.on('error', function(error) {
	  assert.ifError(error);
	  assert.ok(false);
	});

	app.use('/assets',express.static(__dirname + '/public'));
	//middleware
	app.use(session({
	  secret: 'keyboard cat',
	  store: store,
	  resave: true,	  
	  saveUninitialized: true,
	  cookie: {
	  	httpOnly: true, 
	  	//maxAge: 3600000 * 24, // 24 hours
	  	path: "/auth"
	  } //secure: true will be set on the cookie when i this site is on https
	}));
	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());		
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	
	app.set('views', __dirname + '/ui-views');
	app.set('view engine', 'ejs');

	passport.serializeUser(function(user, done) {   
    	done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {		
			done(err, user);				
		});
	});
}