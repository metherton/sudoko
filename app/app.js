'use strict';

// Declare app level module which depends on views, and components
//var sudokoApp = angular.module('myApp', [
//    'ngRoute',
//    'myApp.view1',
//    'myApp.view2',
//    'myApp.version'
//]);

var sudokoApp = angular.module('myApp', ['ui.bootstrap']);

//sudokoApp.config(['$routeProvider', function($routeProvider) {
////  $routeProvider.otherwise({redirectTo: '/view1'});
//  $routeProvider.otherwise({redirectTo: '/sudoko'});
//}]);
sudokoApp.directive('sudoko', function() {
    return {
        templateUrl: 'sudoko.html'
    };
});
