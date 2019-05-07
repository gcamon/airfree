var app = angular.module("myApp",["ngResource","ngTouch",'AngularPrint']);

app.factory("localManager",["$window",function($window){
  return {
	setValue: function(key, value) {
	  $window.localStorage.setItem(key, JSON.stringify(value));
	},
	getValue: function(key) {       
	  return JSON.parse($window.localStorage.getItem(key)); 
	},
	removeItem: function(key) {
	  $window.localStorage.removeItem(key);
	}
  };
}]);

app.controller("planController",["$scope","$window","localManager",function($scope,$window,localManager){

	$scope.item = function(title,description,speed,price,gb,rate,duration){
		var productDetail = {
			title: title,
			description: description,
			speed: speed,
			price:price,
			GB: gb,
			rate: rate,
			duration:duration
		}

		localManager.setValue("dataplans",productDetail);
		$window.location.href = "/auth/recharge";
	}
}]);

app.controller("rechargeController",["$scope","$rootScope","$resource","$http","localManager",function($scope,$rootScope,$resource,$http,localManager){
	
	$scope.plan = localManager.getValue("dataplans");

	$scope.user = {}
	
	$scope.getAcc = function(){


		$http.post('insert.php',{email: $scope.user.email})
		.success(function(data){
			console.log(data)
			//$scope.displayData();
		})

		//$scope.isTrue = true
		//$rootScope.userDetails = {firstname:"obinna",lastname:"ede",balance:200000
		
	}  

	  $scope.displayData = function(){  
		   $http.get("account.php")  
		   .success(function(data){  
				console.log(data)
				$scope.names = data;  
		   });  
	  }  
 
	
	

}]);

app.controller("paymentController",["$scope","$rootScope","localManager","$resource","$window",function($scope,$rootScope,localManager,$resource,$window){
	$scope.plan = localManager.getValue("dataplans");
	$rootScope.userDetails = {firstname:"obinna",lastname:"ede",balance:200000}

	$scope.isDeposit = true;
	$scope.deposit = function(){
		$scope.isDeposit = false;
	}

	$scope.payWithCard = function(){
		$window.location.href = "";
	}

	

}]);

app.controller("signupController",["$scope","$rootScope","$resource","localManager",function($scope,$rootScope,$resource,localManager){
	$scope.user = {}
	var initResource = $resource("/user/signup",null,{createUser:{method: "POST"}});
	$scope.create = function(){	
		initResource.createUser($scope.user,function(response){
			$scope.status = response;
		});		
	}

	

	$scope.isPrivate = true;
	$scope.type = "Single user";

	$scope.company = function() {
		$scope.type = "Enterprise"
		$scope.isPrivate = false;
	}

	$scope.private = function () {
		$scope.type = "Single user";
		$scope.isPrivate = true;
	}


	
}])

