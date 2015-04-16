'use strict';

describe('myApp.view2 module', function() {

    var $rootScope;

  beforeEach(module('myApp.view2'));

    beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

  describe('view2 controller', function(){

    it('should ....', inject(function($controller) {


        var $scope = {};

        //spec body
      var view2Ctrl = $controller('View2Ctrl', {$scope : $scope});
            $scope.employees = [];
            expect(view2Ctrl).toBeDefined();


    }));

  });
});