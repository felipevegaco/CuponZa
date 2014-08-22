// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cuponza', ['ionic', 'cuponza.controllers','google-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('cuponza', {
      url: "/cuponza",
      templateUrl: "templates/home.html"
    })

    .state('signup', {
      url: "/cuponza/signup",
      templateUrl: "templates/signup.html",
      controller: 'SignUpCtrl'
    })

    .state('facebook', {
      url: "/cuponza/facebook",
      templateUrl: "templates/facebook.html",
      controller: 'FacebookCtrl'
    })

    .state('map', {
      url: "/cuponza/map",
      templateUrl: "templates/map.html",
      controller: 'MapCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/cuponza');

});
