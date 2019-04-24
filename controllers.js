"use strict";
var nodemailer = require('nodemailer');
var mongoose = require("mongoose");
var User = mongoose.model("User");

exports.home = function(req,res) {
	console.log("ashjashha")
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
	res.render("signup");
}

exports.login = function(req,res) {
	res.render("login");
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
	res.render("xpress-recharge");
}

exports.userAccount = function(req,res) {
	res.render("index");
}

exports.userSignIn = function(req,res) {
	res.render("index");
}

exports.userRegister = function(req,res) {
	res.render("index");
}