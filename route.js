"use strict";

module.exports = function(app) {
	var core = require("./controllers");
	
	app.route('/')
	.get(core.home)

	app.route('/data/:plan')
	.get(core.plan)

	app.route('/signup')
	.get(core.signup)

	app.route('/login')
	.get(core.login)

	app.route('/services')
	.get(core.services)

	app.route('/coverage')
	.get(core.coverage)

	app.route('/help')
	.get(core.help)

	app.route('/terms')
	.get(core.terms)

	app.route('/recharge')
	.get(core.recharge)

	app.route('/auth/account')
	.get(core.userAccount)

	app.route('/auth/sign-in')
	.post(core.userSignIn)

	app.route('/auth/register')
	.post(core.userRegister)

}