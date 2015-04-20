'use strict';

describe('myApp.view1 module', function() {

  var $rootScope, $compile;

  beforeEach(module('myApp.view1'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));


  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body

      var $scope = {};
      var view1Ctrl = $controller('View1Ctrl', {$scope : $scope});
      $scope.employees = [];
      expect(view1Ctrl).toBeDefined();
    }));

  });
});