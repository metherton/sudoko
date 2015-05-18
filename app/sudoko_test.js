'use strict';

describe('sudoko directive', function() {

    var $rootScope, $compile, elm, scope;

    beforeEach(module('sudokoApp'));
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('replaces the sudoko element with the appropriate content', function() {
        var elm = angular.element('<div><sudoko>sudokotext<sudoko-row>sudokorowtext<sudoko-cell>sudokocelltext</sudoko-cell></sudoko-row></sudoko></div>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
        expect(elm.html()).toContain('sudokotext');
        expect(elm.html()).toContain('sudokorowtext');
        expect(elm.html()).toContain('sudokocelltext');
    });


});