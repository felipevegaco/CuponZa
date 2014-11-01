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
        var transform = function(data){
          return $.param(data);
        }

        $http({
            method: 'POST',
            url: 'http://54.187.118.20:8080/cuponza/cupons/byLocation',
            data : 'longitude='+oPos.longitude+'&latitude='+oPos.latitude,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
          }).
          success(function(data) {
              //TODO move the code from error handler function
             
              var aCupons = data;
              $ionicLoading.hide();
              drawCuponsOnMap(aCupons);
          }).
          error(function(data) {
              alert('There was a problem while obtaining the coupons data - /cupons/byLocation');
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
    for(var i=0; i<aCupons.length; i++) {
      var marker = null;
      var myLatlng = new google.maps.LatLng(aCupons[i].latidude,aCupons[i].longitude);
      var title = aCupons[i].cuponTitle;
      console.log(title);
      marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: title,
          content : { 'description' : aCupons[i].cuponDescription, 'imgURL' : aCupons[i].pictureURL, 'quantity' : aCupons[i].cuponValue }
      });
      addListenerToMarker(marker);
      //console.log('latitude : '+aCupons[i].latidude+', longitude : ' + aCupons[i].longitude);
    }

  }

  function addListenerToMarker(oMarker) {
    google.maps.event.addListener(oMarker, 'click', function() {
        openDetailMarker(oMarker);
    });
  }

  function openDetailMarker(oMarker) {
      
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