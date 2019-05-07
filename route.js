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

	app.route('/auth/recharge')
	.get(core.recharge)

	app.route('/auth/account')
	.get(core.userAccount)

	app.route('/auth/sign-in')
	.post(core.userSignIn) 

	app.route('/auth/register')
	.post(core.userRegister)

	app.route('/auth/quick-signin')
	.post(core.userSignInQuick) 

	app.route('/auth/recharge/fail')
	.get(core.userRechargeLoginFail)

	app.route('/signup/:id/:type')
	.get(core.adminRegister)

	//manage plans
	app.route('/auth/plans')
	.get(core.plans)
	.post(core.createPlan)
	.put(core.editPlan)
	.delete(core.deletePlan)

	app.route("/download/services")
	.get(core.downloadPDF)

}