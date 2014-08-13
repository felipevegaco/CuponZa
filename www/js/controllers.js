angular.module('cuponza.controllers', [])

.controller('SignUpCtrl', function($scope, $http) {
	$http({
		method: 'GET',
		url :'http://192.168.1.59:8080/cuponza'
	}).
	success(function(data){
		alert(data);
	}).
	error(function(data){
		alert("crap");
	})
});