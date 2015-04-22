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

sudokoApp.factory('Game', function() {

    var candidates = {
        rows: {
            a: ['1','2','3','4','5','6','7','8','9'],
            b: ['1','2','3','4','5','6','7','8','9'],
            c: ['1','2','3','4','5','6','7','8','9'],
            d: ['1','2','3','4','5','6','7','8','9'],
            e: ['1','2','3','4','5','6','7','8','9'],
            f: ['1','2','3','4','5','6','7','8','9'],
            g: ['1','2','3','4','5','6','7','8','9'],
            h: ['1','2','3','4','5','6','7','8','9'],
            i: ['1','2','3','4','5','6','7','8','9']
        },
        columns: {
            '1': ['1','2','3','4','5','6','7','8','9'],
            '2': ['1','2','3','4','5','6','7','8','9'],
            '3': ['1','2','3','4','5','6','7','8','9'],
            '4': ['1','2','3','4','5','6','7','8','9'],
            '5': ['1','2','3','4','5','6','7','8','9'],
            '6': ['1','2','3','4','5','6','7','8','9'],
            '7': ['1','2','3','4','5','6','7','8','9'],
            '8': ['1','2','3','4','5','6','7','8','9'],
            '9': ['1','2','3','4','5','6','7','8','9']
        },
        squares: {
            '1_1': ['1','2','3','4','5','6','7','8','9'],
            '1_2': ['1','2','3','4','5','6','7','8','9'],
            '1_3': ['1','2','3','4','5','6','7','8','9'],
            '2_1': ['1','2','3','4','5','6','7','8','9'],
            '2_2': ['1','2','3','4','5','6','7','8','9'],
            '2_3': ['1','2','3','4','5','6','7','8','9'],
            '3_1': ['1','2','3','4','5','6','7','8','9'],
            '3_2': ['1','2','3','4','5','6','7','8','9'],
            '3_3': ['1','2','3','4','5','6','7','8','9']
        }
    };

    var model =  {
        a2: '4',
        a5: '8',
        a7: '2',
        b3: '8',
        b4: '2',
        b5: '6',
        b8: '9',
        c1: '7',
        c6: '4',
        c9: '3',
        d2: '3',
        d6: '2',
        d9: '4',
        e1: '1',
        e5: '7',
        e7: '5',
        f3: '6',
        f4: '5',
        f8: '3',
        g1: '9',
        g4: '8',
        g7: '1',
        g8: '4',
        h2: '6',
        h6: '5',
        h7: '9',
        i1: '4',
        i3: '7',
        i5: '1',
        i9: '5'
    };

    ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
        ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
            var key = row + col;
            if (model[key] === undefined) {
                model[key] = '';
            }
        })
    });

    ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
        ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
            var key = row + col;
            if (angular.isDefined(model[key])) {
                var index = candidates.rows[row].indexOf(model[key]);
                if (index > -1) {
                    candidates.rows[row].splice(index,1);
                }
            }
        })
    });

    return {
      get: function() {
          return model;
      },
      getCandidates: function() {
          return candidates;
      }
    };

});

sudokoApp.directive('sudoko', function(Game) {

    function getTemplate() {
        return '<div class="container-fluid"><button ng-click="solve()">Solve</button>' +
        '<div class="row"><div class="col-md-1">&nbsp;</div><div class="col-md-1"><div class="input-group">1</div></div><div class="col-md-1"><div class="input-group">2</div></div>' +
            '<div class="col-md-1">' +
                '<div class="input-group">3</div>' +
            '</div>' +
            '<div class="col-md-1">' +
                '<div class="input-group">4</div>' +
            '</div>' +
            '<div class="col-md-1">' +
                '<div class="input-group">5</div>' +
            '</div>' +
            '<div class="col-md-1">' +
                '<div class="input-group" >6</div>' +
            '</div>' +
            '<div class="col-md-1">' +
                '<div class="input-group">7</div>' +
            '</div>' +
            '<div class="col-md-1">' +
                '<div class="input-group">8</div>' +
            '</div>' +
            '<div class="col-md-1">' +
                '<div class="input-group">9</div>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-md-1">A</div>' +
            '<div class="col-md-1">' +
            '<div class="input-group">' +
                '<input ng-model="model.a1" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<div class="input-group">' +
                '<input ng-model="model.a2" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
                '<input ng-model="model.a3" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<div class="input-group">' +
                '<input ng-model="model.a4" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<div class="input-group">' +
                '<input ng-model="model.a5" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
                '<input ng-model="model.a6" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<div class="input-group">' +
                '<input ng-model="model.a7" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<div class="input-group">' +
                '<input ng-model="model.a8" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<div class="input-group">' +
                '<input ng-model="model.a9" type="text" class="form-control">' +
                '</div>' +
            '</div>' +
            '</div>' +
        '<div class="row">' +
            '<div class="col-md-1">B</div>' +
            '<div class="col-md-1">' +
                '<div class="input-group">' +
                    '<input ng-model="model.b1" type="text" class="form-control">' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-1">' +
                    '<div class="input-group">' +
                        '<input ng-model="model.b2" type="text" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                        '<div class="input-group">' +
                            '<input ng-model="model.b3" type="text" class="form-control">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-1">' +
                            '<div class="input-group">' +
                                '<input ng-model="model.b4" type="text" class="form-control">' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-1">' +
                                '<div class="input-group">' +
                                    '<input ng-model="model.b5" type="text" class="form-control">' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                    '<div class="input-group">' +
                                        '<input ng-model="model.b6" type="text" class="form-control">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-md-1">' +
                                        '<div class="input-group">' +
                                            '<input ng-model="model.b7" type="text" class="form-control">' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-md-1">' +
                                            '<div class="input-group">' +
                                                '<input ng-model="model.b8" type="text" class="form-control">' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-md-1">' +
                                                '<div class="input-group">' +
                                                    '<input ng-model="model.b9" type="text" class="form-control">' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="row" >' +
                                                '<div class="col-md-1">C</div>' +
                                                '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                    '<div class="input-group">' +
                                                        '<input ng-model="model.c1" type="text" class="form-control">' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                        '<div class="input-group">' +
                                                            '<input ng-model="model.c2" type="text" class="form-control">' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="col-md-1"  style="border-right-style: solid;border-right-width: thin;border-bottom-style: solid;border-bottom-width: thin">' +
                                                            '<div class="input-group">' +
                                                                '<input ng-model="model.c3" type="text" class="form-control">' +
                                                                '</div>' +
                                                            '</div>' +
                                                            '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                '<div class="input-group">' +
                                                                    '<input ng-model="model.c4" type="text" class="form-control">' +
                                                                    '</div>' +
                                                                '</div>' +
                                                                '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                    '<div class="input-group">' +
                                                                        '<input ng-model="model.c5" type="text" class="form-control">' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
                                                                        '<div class="input-group">' +
                                                                            '<input ng-model="model.c6" type="text" class="form-control">' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                        '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                            '<div class="input-group">' +
                                                                                '<input ng-model="model.c7" type="text" class="form-control">' +
                                                                                '</div>' +
                                                                            '</div>' +
                                                                            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                '<div class="input-group">' +
                                                                                    '<input ng-model="model.c8" type="text" class="form-control">' +
                                                                                    '</div>' +
                                                                                '</div>' +
                                                                                '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                   '<div class="input-group">' +
                                                                                        '<input ng-model="model.c9" type="text" class="form-control">' +
                                                                                        '</div>' +
                                                                                    '</div>' +
                                                                                '</div>' +
                                                                                '<div class="row">' +
                                                                                    '<div class="col-md-1">D</div>' +
                                                                                    '<div class="col-md-1">' +
                                                                                        '<div class="input-group">' +
                                                                                            '<input ng-model="model.d1" type="text" class="form-control">' +
                                                                                            '</div>' +
                                                                                        '</div>' +
                                                                                        '<div class="col-md-1">' +
                                                                                            '<div class="input-group">' +
                                                                                                '<input ng-model="model.d2" type="text" class="form-control">' +
                                                                                                '</div>' +
                                                                                            '</div>' +
                                                                                            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                '<div class="input-group">' +
                                                                                                    '<input ng-model="model.d3" type="text" class="form-control">' +
                                                                                                    '</div>' +
                                                                                                '</div>' +
                                                                                                '<div class="col-md-1">' +
                                                                                                    '<div class="input-group">' +
                                                                                                        '<input ng-model="model.d4" type="text" class="form-control">' +
                                                                                                        '</div>' +
                                                                                                    '</div>' +
                                                                                                    '<div class="col-md-1">' +
                                                                                                        '<div class="input-group">' +
                                                                                                            '<input ng-model="model.d5" type="text" class="form-control">' +
                                                                                                            '</div>' +
                                                                                                        '</div>' +
                                                                                                        '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                            '<div class="input-group">' +
                                                                                                                '<input ng-model="model.d6" type="text" class="form-control">' +
                                                                                                                '</div>' +
                                                                                                            '</div>' +
                                                                                                            '<div class="col-md-1">' +
                                                                                                                '<div class="input-group">' +
                                                                                                                    '<input ng-model="model.d7" type="text" class="form-control">' +
                                                                                                                    '</div>' +
                                                                                                                '</div>' +
                                                                                                                '<div class="col-md-1">' +
                                                                                                                    '<div class="input-group">' +
                                                                                                                        '<input ng-model="model.d8" type="text" class="form-control">' +
                                                                                                                        '</div>' +
                                                                                                                    '</div>' +
                                                                                                                    '<div class="col-md-1">' +
                                                                                                                        '<div class="input-group">' +
                                                                                                                            '<input ng-model="model.d9" type="text" class="form-control">' +
                                                                                                                            '</div>' +
                                                                                                                        '</div>' +
                                                                                                                    '</div>' +
                                                                                                                    '<div class="row">' +
                                                                                                                        '<div class="col-md-1">E</div>' +
                                                                                                                        '<div class="col-md-1">' +
                                                                                                                            '<div class="input-group">' +
                                                                                                                                '<input ng-model="model.e1" type="text" class="form-control">' +
                                                                                                                                '</div>' +
                                                                                                                            '</div>' +
                                                                                                                            '<div class="col-md-1">' +
                                                                                                                                '<div class="input-group">' +
                                                                                                                                    '<input ng-model="model.e2" type="text" class="form-control">' +
                                                                                                                                    '</div>' +
                                                                                                                                '</div>' +
                                                                                                                                '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin" >' +
                                                                                                                                    '<div class="input-group">' +
                                                                                                                                        '<input ng-model="model.e3" type="text" class="form-control">' +
                                                                                                                                        '</div>' +
                                                                                                                                    '</div>' +
                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                        '<div class="input-group">' +
                                                                                                                                            '<input ng-model="model.e4" type="text" class="form-control">' +
                                                                                                                                            '</div>' +
                                                                                                                                        '</div>' +
                                                                                                                                        '<div class="col-md-1">' +
                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                '<input ng-model="model.e5" type="text" class="form-control">' +
                                                                                                                                                '</div>' +
                                                                                                                                            '</div>' +
                                                                                                                                            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                    '<input ng-model="model.e6" type="text" class="form-control">' +
                                                                                                                                                    '</div>' +
                                                                                                                                                '</div>' +
                                                                                                                                                '<div class="col-md-1">' +
                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                        '<input ng-model="model.e7" type="text" class="form-control">' +
                                                                                                                                                        '</div>' +
                                                                                                                                                    '</div>' +
                                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                            '<input ng-model="model.e8" type="text" class="form-control">' +
                                                                                                                                                            '</div>' +
                                                                                                                                                        '</div>' +
                                                                                                                                                        '<div class="col-md-1">' +
                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                '<input ng-model="model.e9" type="text" class="form-control">' +
                                                                                                                                                                '</div>' +
                                                                                                                                                            '</div>' +
                                                                                                                                                        '</div>' +
                                                                                                                                                        '<div class="row"><div class="col-md-1">F</div><div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin"><div class="input-group">' +
                                                                                                                                                                    '<input ng-model="model.f1" type="text" class="form-control">' +
                                                                                                                                                                    '</div>' +
                                                                                                                                                                '</div>' +
                                                                                                                                                                '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                        '<input ng-model="model.f2" type="text" class="form-control">' +
                                                                                                                                                                        '</div>' +
                                                                                                                                                                    '</div>' +
                                                                                                                                                                    '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                            '<input ng-model="model.f3" type="text" class="form-control">' +
                                                                                                                                                                            '</div>' +
                                                                                                                                                                        '</div>' +
                                                                                                                                                                        '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                '<input ng-model="model.f4" type="text" class="form-control">' +
                                                                                                                                                                                '</div>' +
                                                                                                                                                                            '</div>' +
                                                                                                                                                                            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                    '<input ng-model="model.f5" type="text" class="form-control">' +
                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                '</div>' +
                                                                                                                                                                                '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                        '<input ng-model="model.f6" type="text" class="form-control">' +
                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                    '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                            '<input ng-model="model.f7" type="text" class="form-control">' +
                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                        '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                '<input ng-model="model.f8" type="text" class="form-control">' +
                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
                                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                                    '<input ng-model="model.f9" type="text" class="form-control">' +
                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                            '<div class="row">' +
                                                                                                                                                                                                '<div class="col-md-1">G</div>' +
                                                                                                                                                                                                '<div class="col-md-1">' +
                                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                                        '<input ng-model="model.g1" type="text" class="form-control">' +
                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                                            '<input ng-model="model.g2" type="text" class="form-control">' +
                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                        '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                                '<input ng-model="model.g3" type="text" class="form-control">' +
                                                                                                                                                                                                               '</div>' +
                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                            '<div class="col-md-1">' +
                                                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                                                    '<input ng-model="model.g4" type="text" class="form-control">' +
                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                '<div class="col-md-1">' +
                                                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                                                        '<input ng-model="model.g5" type="text" class="form-control">' +
                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                    '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                                                            '<input ng-model="model.g6" type="text" class="form-control">' +
                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                        '<div class="col-md-1">' +
                                                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                                                '<input ng-model="model.g7" type="text" class="form-control">' +
                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                            '<div class="col-md-1">' +
                                                                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                                                                    '<input ng-model="model.g8" type="text" class="form-control">' +
                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                '<div class="col-md-1">' +
                                                                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                                                                        '<input ng-model="model.g9" type="text" class="form-control">' +
                                                                                                                                                                                                                                       '</div>' +
                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                '<div class="row">' +
                                                                                                                                                                                                                                    '<div class="col-md-1">H</div>' +
                                                                                                                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                                                                            '<input ng-model="model.h1" type="text" class="form-control">' +
                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                        '<div class="col-md-1">' +
                                                                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                                                                '<input ng-model="model.h2" type="text" class="form-control">' +
                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                                                                                    '<input ng-model="model.h3" type="text" class="form-control">' +
                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                '<div class="col-md-1">' +
                                                                                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                                                                                        '<input ng-model="model.h4" type="text" class="form-control">' +
                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                                                                                            '<input ng-model="model.h5" type="text" class="form-control">' +
                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                        '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                                                                                '<input ng-model="model.h6" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                            '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                                                                                                    '<input ng-model="model.h7" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                                '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                                                                                                        '<input ng-model="model.h8" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                                                                                                            '<input ng-model="model.h9" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                                    '<div class="row">' +
                                                                                                                                                                                                                                                                        '<div class="col-md-1">I</div>' +
                                                                                                                                                                                                                                                                        '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                                                                                                '<input ng-model="model.i1" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                                            '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                                                                                                                    '<input ng-model="model.i2" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                                                '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                                                                                                                        '<input ng-model="model.i3" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                                                                                                                            '<input ng-model="model.i4" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                                                        '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                                                                                                                '<input ng-model="model.i5" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                                                            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
                                                                                                                                                                                                                                                                                                '<div class="input-group">' +
                                                                                                                                                                                                                                                                                                    '<input ng-model="model.i6" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                                                                '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                                                    '<div class="input-group">' +
                                                                                                                                                                                                                                                                                                        '<input ng-model="model.i7" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                                                                    '</div>' +
                                                                                                                                                                                                                                                                                                    '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                                                        '<div class="input-group">' +
                                                                                                                                                                                                                                                                                                            '<input ng-model="model.i8" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                                                                        '</div>' +
                                                                                                                                                                                                                                                                                                        '<div class="col-md-1">' +
                                                                                                                                                                                                                                                                                                            '<div class="input-group">' +
                                                                                                                                                                                                                                                                                                                '<input ng-model="model.i9" type="text" class="form-control">' +
                                                                                                                                                                                                                                                                                                                '</div>' +
                                                                                                                                                                                                                                                                                                            '</div>' +
                                                                                                                                                                                                                                                                                                        '</div></div>';
    }

//    function getTemplate() {
//        return
//
//
//    }


    return {
        scope: {},
        controller: function($scope, $attrs) {

            $scope.solve = function() {
                console.log('solve the puzzle');
            };

            function initialize() {
               $scope.model = Game.get();
            }
//            // Publish the controller API on $scope
//            if($attrs.counter) {
//                $scope[$attrs.counter] = this;
//            }
//            $scope.count = 0;
//
//            // increment and decrement functions are
//            // the API of the controller
//            this.increment = function() {
//                $scope.count++;
//            };
//            this.decrement = function() {
//                $scope.count--;
//            }
            initialize();
        },
       // templateUrl: 'sudoko.html'
        template: getTemplate()
    }
});
