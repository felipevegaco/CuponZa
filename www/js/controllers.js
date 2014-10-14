angular.module('cuponza.controllers', [])

/**
 * Sign Up Controller
 * @param  {[type]} $scope scope object
 * @param  {[type]} $http  http object
 * @return {[type]}        
 */
.controller('SignUpCtrl', function($scope, $http) {
        $scope.formData = {};

        $scope.submitRegistry = function() {
            var MIN_PASSWORD_CHARACTERS = 6;
            var oFormData = this.formData;

            //TODO - Replace the condition for something descent
            if (Object.keys(oFormData).length > 0) {
                if (oFormData.firstName == '' || oFormData.lastName == '') {
                    alert('Debes diligenciar todos los campos');
                    return;
                } else if (oFormData.password.length <= MIN_PASSWORD_CHARACTERS || oFormData.passwordConfirmation.length <= MIN_PASSWORD_CHARACTERS) {
                    alert('La clave debe tener al menos 6 caracteres');
                    return;
                } else if (oFormData.password != oFormData.passwordConfirmation) {
                    alert('La clave debe coincidir');
                    return;
                }
            } else {
                alert('Debe completar todos los campos');
                return;
            }

            $http({
                    method: 'POST',
                    url: 'http://54.187.118.20:8080/cuponza/user/add',
                    data: oFormData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).
            success(function(data) {
                console.log(JSON.parse(data));
            }).
            error(function(data) {
                console.log(data);
            })
        }
    })
/**
 * Facebook Controller
 * @param  {[type]} $scope scope object
 * @param  {[type]} $http  http object
 * @return {[type]}        
 */
.controller('FacebookCtrl', function($scope, $http) {
    openFB.init({
        appId: '1446743368937107'
    });
    $scope.fbLogin = function() {
        openFB.login(
            function(response) {
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    //$scope.closeLogin();
                } else {
                    alert('Facebook login failed');
                }
            }, {
                scope: 'email,publish_actions'
            });
    }

    $scope.fbLogout = function() {
        openFB.logout();
    }

    $scope.fbLoginStatus = function() {
        openFB.getLoginStatus(function(loginStatus) {
            alert(loginStatus.status)
        });
    }

    $scope.fbGetuserDetails = function() {
        var config = {
            method: 'GET',
            path: '/me',
            success: printPersonalDetails,
            error: showFBError
        };
        openFB.api(config);
    }

    function printPersonalDetails(o) {
        console.log(o);
    }

    function showFBError(o) {
        console.log(o);
    }
})
/**
 * Twitter Controller
 * @param  {[type]} $scope scope object
 * @param  {[type]} $http  http object
 * @return {[type]}       
 */
.controller('TwitterCtrl', function($scope, TwitterLib) {
    /**
     *
     */
    $scope.doLogin = function () {
        TwitterLib.init().then(function (_data) {
            alert(JSON.stringify(_data));
        }, function error(_error) {
            alert(JSON.stringify(_error));
        });
    };
    /**
     *
     */
    $scope.doLogout = function () {
        TwitterLib.logOut();
    };
    /**
     *
     */
    $scope.doStatus = function () {
        var options = {
            url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
            data: {
                'screen_name': "pipevegaaraujo",
                'count': "25"
            }
        };
        TwitterLib.apiGetCall(options).then(function (_data) {
            alert("doStatus success");
            $scope.items = _data;

        }, function (_error) {
            alert("doStatus error" + JSON.stringify(_error));
        });
    };
    /**
     *
     */
    $scope.doTweet = function () {
        TwitterLib.tweet("Sample tweet " + new Date()).then(function (_data) {
            alert("tweet success");

        }, function (_error) {
            alert("tweet error" + JSON.stringify(_error));
        });
    };
});