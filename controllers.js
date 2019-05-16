"use strict";
var nodemailer = require('nodemailer');
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Client = mongoose.model("Client");
var Admin = mongoose.model("Admin");
var Super = mongoose.model("Super");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var salt = require('./salt');
var uuid = require('uuid');


passport.use('signup', new LocalStrategy({
	usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true 
},
function(req,email,password,done){
	process.nextTick(function(){
		User.findOne({email:email},function(err,user){
			if(err) return done(err);
			if(!user){
				return done(null, false, req.flash('signupMessage', 'Email has already been used please find another one'));	
			} else {
				var person = new User(req.body);
				person.password = salt.createHash(password);
				person.pass = password
				switch(req.body.role){
					case "admin":
						var admin = new Admin(req.body);
						person.id = admin._id;
						person.role = "admin";
						admin.save(function(err,info){});
					break;
					case "super":
						var superAdmin = new Super(req.body);
						person.id = superAdmin._id;
						person.role = "super";
						superAdmin.save(function(err,info){});
					break;
					default:
						var client = new Client(req.body);
						person.id = client._id;
						person.role = "user";
						client.save(function(err,info){});
					break;
				}
				person.save(function(err,info){
					return done(null,person);
				})				
			}
		})
	})
}));

passport.use('user-login', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function (req, email, password, done) {           

	// find a user whose email is the same as the forms email
	// we are checking to see if the user trying to login already exists
	User.findOne({ email :  email }, function(err, user) {
	  
	  // if there are any errors, return the error before anything else
	  if (err) {
	      return done(err);
	  }
	  // if no user is found, return the message
	  if (!user) {
	      return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
	  }
	  // if the user is found but the password is wrong
	  if (!salt.isValidPassword(user,password)) {
	      return done(null, false, req.flash('loginMessage', 'Oops! Wrong email or password.')); // create the loginMessage and save it to session as flashdata
	  }
	  
	  //req.session.user = user;
	  // all is well, return successful user
	  return done(null, user);
	});

}));


exports.home = function(req,res) {
	res.render("index");
}

exports.plan = function(req,res) {
	switch(req.params.plan) {
		case "plan1":
			res.render("plan1");
		break;
		case "plan2":
			res.render("plan2");
		break;
		case "plan3":
			res.render("plan3");
		break;
		case "plan4":
			res.render("plan4");
		break;
		default:
			res.render("plan2");
		break;
	}
}

exports.signup = function(req,res) {
	res.render("signup",{message: "",role: undefined});
}

exports.login = function(req,res) {
	res.render("login",{message: ""});
}

exports.services = function(req,res) {
	res.render("services");
}

exports.coverage = function(req,res) {
	res.render("coverage");
}

exports.help = function(req,res) {
	res.render("help");
}

exports.terms = function(req,res) {
	res.render("terms");
}

exports.recharge = function(req,res) {
	var presence = (!req.user) ? {status: false,message: "Please login so that we can identify your account."} : req.user;
	res.render("xpress-recharge",{presence:  presence});
}

exports.userRechargeLoginFail = function(req,res) {
	var presence = (!req.user) ? 
	{status: false,message: "Please login so that we can identify your account.",errMsg: "Wrong email or password"} : req.user;
	res.render("xpress-recharge",{presence:  presence});
}

exports.userAccount = function(req,res) {
	if(req.user) {
		switch(req.user.role) {
			case "super":
				res.send({status: true, message: "Welcome to super admin dashboard. This page is under construction."});
			break;
			case "admin":
				res.send({status: true, message: "Welcome to admin dashboard. This page is under construction."});
			break;
			default:
				res.render("account",{presence:req.user});
			break;
		}
	} else {
		res.end("Permission denied! Please login or create an account.");
	}
	
}

exports.userSignIn = passport.authenticate('user-login', {
	  successRedirect : '/auth/account', // redirect to the secure profile section
	  failureRedirect : '/login', // redirect back to the signup page if there is an error
	  failureFlash : true // allow flash messages
});

exports.userSignInQuick = passport.authenticate('user-login', {
	  successRedirect : '/auth/recharge', // redirect to the secure profile section
	  failureRedirect : '/auth/recharge/fail', // redirect back to the signup page if there is an error
	  failureFlash : true // allow flash messages
});

exports.userRegister = function(req,res,next) {
	passport.authenticate('signup', function(err, user, info) {   
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting signup
    if (!user) {	
      res.render('signup',{message: "User already exist.",role: undefined});
    } else {		
	   	res.render('success',{message: "Account was created successfully!"}); 

	   	var transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        auth: {
          user: "support@airfreeng.com",
          pass: "$udzMh08v)f1O"
        }
      });

      var mailOptions = {
        from: 'Airfree support@airfreeng.com',
        to: user.email,//'ede.obinna27@gmail.com',//data.email
        subject: 'Delivering quality broadband Internet services at an affordable price',
        html: '<table><tr><td> <p>Dear customer, you are welcome to Airfreeng.'  
        + 'We are so happy to have you on board!!.<br> You have just joined a community of over 10000 satisfied' 
        + ' customers who enjoy fast, affordable and quality Internet. <br>'
        + 'Kindly note that your details are 100% safe. ' 
        + '</p><br><br>'
        + '<label>Your login details are:</label><br><br>'
        + 'Email: ' + user.email + '<br>'
        + 'Password: ' + user.pass + '<br><br>'
        + "<b>THE AIRFREE TEAM</b></td></tr></table>"

      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });	
    }
  })(req, res, next)	
}

//admin route for registering 
// admin ===> https://www.airfreeng.com/signup/4nxHDsGkAvTyJkkr/admin
// super ===> https://www.airfreeng.com/signup/4nxHDsGkAvTyJkkr/super
exports.adminRegister = function(req,res,next) {
	//4nxHDsGkAvTyJkkr
	if(req.params.id == "4nxHDsGkAvTyJkkr") {
		res.render("signup",{message: "",role: req.params.type});
	} else {
		res.end("unauthorized access!");
	}
}

exports.downloadPDF = function(req,res) {
	var file = __dirname + "/airfree_services.pdf";
    res.download(file); // Set disposition and send it.
}


// get all plans json
exports.plans = function(req,res) {
	
}

exports.createPlan = function(req,res) {
	
}

exports.editPlan = function(req,res) {
	
}

exports.deletePlan = function(req,res) {
	
}

exports.logout = function(req,res){
	if(req.user) {
	  req.logout();
      res.redirect('/login');
	}
}

