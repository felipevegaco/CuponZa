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
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email,publish_actions'});
		
	}
});