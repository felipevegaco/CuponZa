angular.module('cuponza.controllers', [])

.controller('SignUpCtrl', function($scope, $http) {
	$scope.formData = {};

	$scope.submitRegistry = function(){
		var MIN_PASSWORD_CHARACTERS = 6;
		var oFormData = this.formData;

		//TODO - Replace the condition for something descent
		if(Object.keys(oFormData).length > 0) {
			if(oFormData.firstName == '' || oFormData.lastName == '') {
				alert('Debes diligenciar todos los campos');
				return;
			} else if(oFormData.password.length <= MIN_PASSWORD_CHARACTERS || oFormData.passwordConfirmation.length <= MIN_PASSWORD_CHARACTERS) {
				alert('La clave debe tener al menos 6 caracteres');
				return;
			} else if(oFormData.password != oFormData.passwordConfirmation) {
				alert('La clave debe coincidir');
				return;
			}
		} else {
			alert('Debe completar todos los campos');
			return;
		}

		$http({
			method: 'POST', 
			url : 'http://172.20.16.144:8082/cuponza/user/add', 
			//headers: {"Content-type" : 'application/x-www-form-urlencoded'}, 
			data: oFormData }
		).
		//$http.post('http://192.168.1.59:8080/cuponza/user/add', oFormData).
			success(function(data){
				console.log(JSON.parse(data));
			}).
			error(function(data){
				console.log(data);
		})
	}
})
.controller('FacebookCtrl', function($scope, $http) {
	openFB.init({appId: '1446743368937107'});
	$scope.fbLogin = function(){
		openFB.login(		
        function(response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                //$scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email,publish_actions'});
		
	}

	$scope.fbLogout = function(){
		openFB.logout();
	}
	$scope.fbLoginStatus = function(){
		openFB.getLoginStatus(function(loginStatus){alert(loginStatus.status)});
	}

	$scope.fbGetuserDetails = function(){
		var config = {
			method : 'GET',
			path :   '/me',
			success :  printPersonalDetails,
			error   :  showFBError
		};
		openFB.api(config);
	}

	function printPersonalDetails(o){
		console.log(o);
	}

	function showFBError(o){
		console.log(o);
	}
}).
.controller('TwitterCtrl', function($scope, $http) {
	$scope.twLogin = function() {
		alert('hello twitter');
	}
}).
 controller('MapCtrl', function($scope, $http){
 	var options = {
 		enableHighAccuracy: true,
  		timeout: 5000,
  		maximumAge: 0
 	};
 	//:TODO get rid of this false map object
 	$scope.map = {
			    center: {
			        latitude:  11,
			        longitude: 11
			    		},
			    zoom: 1
				};

 	function getLocationSuccess(pos){
 		
 		$scope.position = pos;
 		console.log($scope.position);
 		$scope.map = {
			    center: {
			        latitude:  pos.coords.latitude,
			        longitude: pos.coords.longitude
			    		},
			    zoom: 17
				}
				console.log($scope.map);

 	}
 	function getLocationError(err){
 		console.log(err);
 	}
 	navigator.geolocation.getCurrentPosition(getLocationSuccess,getLocationError,options);
 	
 });