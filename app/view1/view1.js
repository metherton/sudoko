'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {

    $scope.employees = [
        {id: 1,
            name: 'Alice',
            age: 27,
            job: 'Developer'},
        {id: 2,
            name: 'Bob',
            age: 56,
            job: 'Secretary'},
        {id: 3,
            name: 'Charlie',
            age: 21,
            job: 'Janitor'},
        {id: 4,
            name: 'Dave',
            age: 32,
            job: 'CEO'}
    ];

});