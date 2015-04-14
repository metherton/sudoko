'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope) {

        $scope.managers = [
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