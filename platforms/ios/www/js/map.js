angular.module('map', [])

.controller('MapCtrl', function($scope, $ionicLoading) {
  var map;
  function initialize() {
    var oPos = { latitude : 0, longitude : 0 };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
    } else {
       alert("Geolocation is not supported by this browser.");
    }

    function initMap(position) {
        oPos.latitude = position.coords.latitude;
        oPos.longitude = position.coords.longitude;
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