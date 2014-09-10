angular.module('map', [])

.controller('MapCtrl', function($scope, $ionicLoading, $http) {
  var map;

  $scope.loading = $ionicLoading.show({
    content: 'Loading first time...',
    showBackdrop: true
  });

  function initialize() {
    var oPos = { latitude : 0, longitude : 0 };

    var optionsGeolocation = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap, errorGettingCurrentPos, optionsGeolocation);
    } else {
       alert("Geolocation is not supported by this browser.");
    }

    function errorGettingCurrentPos () {
      alert('You gotta turn on your GPS');
    }

    function initMap(position) {
        console.log('started initMap');

        oPos.latitude = position.coords.latitude;
        oPos.longitude = position.coords.longitude;

        $http({
            method: 'POST',
            url: 'http://172.20.16.144:8082/cuponza/cupons/byLocation',
            data: { 'longitude' : oPos.latitude, 'latitude' : oPos.longitude }
          }).
          success(function(data) {
              //TODO move the code from error handler function
              console.log("coool man");
          }).
          error(function(data) {
              var aCupons = [
                {
                  cuponDescription : "Santafe descuento grande",
                  cuponTitle : "Burger King 2 x 1",
                  cuponValue : 15,
                  latitude : 6.19791,
                  longitude : -75.5774,
                  pictureURL : "/img/bk_09384.jpg"
                },
                {
                  cuponDescription : "Oviedo CC - Descuento bueno",
                  cuponTitle : "Mimos Helados",
                  cuponValue : 200,
                  latitude : 6.1988,
                  longitude : -75.5742,
                  pictureURL : "/img/bk_09384.jpg"
                }
              ];

              console.log(aCupons);

              $ionicLoading.hide();

              drawCuponsOnMap(aCupons);
          });

        var mapOptions = {
        center: new google.maps.LatLng(oPos.latitude, oPos.longitude),
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        $scope.map = map;
    }

    // Stop the side bar from dragging when mousedown/tapdown on the map
    google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e) {
      e.preventDefault();
      return false;
    });
  }

  function drawCuponsOnMap(aCupons) {
    var myLatlng = new google.maps.LatLng(aCupons[0].latitude,aCupons[0].longitude);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: aCupons[0].cuponTitle
    });

    google.maps.event.addListener(marker, 'click', function() {
      alert(marker.title);
    });


  }

  initialize();

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});