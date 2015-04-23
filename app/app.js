'use strict';

var sudokoApp = angular.module('myApp', ['ui.bootstrap']);

sudokoApp.factory('Game', function() {

    var self = this;

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
  //      b1: '5',
        b3: '8',
        b4: '2',
        b5: '6',
        b8: '9',
        c1: '7',
   //     c5: '5', // 2
        c6: '4',
   //     c7: '6', //12
        c9: '3',
   //     d1: '8', //5
        d2: '3',
   //     d3: '5', // 3
   //     d5: '9', // 1
        d6: '2',
        d9: '4',
        e1: '1',
  //      e2: '9',
  //      e3: '4', // 7
        e5: '7',
        e7: '5',
   //     f1: '2', //6
   //     f2: '7', // 8
        f3: '6',
        f4: '5',
   //     f5: '4', //4
   //     f7: '8', //10
        f8: '3',
        g1: '9',
  //      g3: '2', //11
        g4: '8',
        g7: '1',
        g8: '4',
 //       h1: '3',//9
        h2: '6',
 //       h5: '2', //12
        h6: '5',
        h7: '9',
        i1: '4',
        i3: '7',
        i5: '1',
        i9: '5'
    };

    var updateRowColumnsSquares = function() {
        ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
            ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
                var key = row + col;
                if (angular.isDefined(model[key])) {
                    var rowIndex = candidates.rows[row].indexOf(model[key]);
                    if (rowIndex > -1) {
                        candidates.rows[row].splice(rowIndex,1);
                    }
                    var columnIndex = candidates.columns[col].indexOf(model[key]);
                    if (columnIndex > -1) {
                        candidates.columns[col].splice(columnIndex,1);
                    }
                    var convertRowColToKey = function convertRowColToKey() {
                        var rowPart, colPart;
                        if (['a','b','c'].indexOf(row) > -1) {
                            rowPart = '1';
                        } else if (['d','e','f'].indexOf(row) > -1) {
                            rowPart = '2'
                        } else {
                            rowPart = '3';
                        }
                        if (['1','2','3'].indexOf(col) > -1) {
                            colPart = '1';
                        } else if (['4','5','6'].indexOf(col) > -1) {
                            colPart = '2'
                        } else {
                            colPart = '3';
                        }
                        return rowPart + '_' + colPart;
                    };
                    var squareIndex = candidates.squares[convertRowColToKey()].indexOf(model[key]);
                    if (squareIndex > -1) {
                        candidates.squares[convertRowColToKey()].splice(squareIndex,1);
                    }
                }
            })
        });

    };


    ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
        ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
            var key = row + col;
            if (model[key] === undefined) {
                model[key] = '';
            }
        })
    });

    updateRowColumnsSquares();

    var possibleValues = function(cell) {
        if (model[cell] !== '') {
            //    console.log('cell', cell, 'is undefined');
            return undefined;
        }
        var row = cell.charAt(0);
        var col = cell.charAt(1);
        var convertRowColToKey = function convertRowColToKey() {
            var rowPart, colPart;
            if (['a','b','c'].indexOf(row) > -1) {
                rowPart = '1';
            } else if (['d','e','f'].indexOf(row) > -1) {
                rowPart = '2'
            } else {
                rowPart = '3';
            }
            if (['1','2','3'].indexOf(col) > -1) {
                colPart = '1';
            } else if (['4','5','6'].indexOf(col) > -1) {
                colPart = '2'
            } else {
                colPart = '3';
            }
            return rowPart + '_' + colPart;
        };
        var cellCandidates = [];
        ['1','2','3','4','5','6','7','8','9'].forEach(function(value) {
            if (candidates.rows[row].indexOf(value) > -1 &&
                candidates.columns[col].indexOf(value) > -1 &&
                candidates.squares[convertRowColToKey()].indexOf(value) > -1) {
                cellCandidates.push(value);
            }
        });
        return cellCandidates;
    };


    return {
      set: function(newCell) {
          model[newCell.cell] = newCell.value;
          updateRowColumnsSquares();
      },
      get: function() {
          return model;
      },
      getCandidates: function() {
          return candidates;
      },
      bestCandidate: function() {
          var bestCandidateSoFar = {
              cell: undefined,
              numberOfCandidates: 9,
              value: undefined
          };
          ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
              ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
                  var key = row + col;
                  if (model[key] !== '') {
                      return;
                  }
                  var candidatesForCell = possibleValues(key);

                  if (bestCandidateSoFar.cell === undefined) {
                      bestCandidateSoFar.cell = key;
                      bestCandidateSoFar.numberOfCandidates = candidatesForCell.length;
                      bestCandidateSoFar.value = candidatesForCell[0];
                  } else {
                      if (candidatesForCell.length < bestCandidateSoFar.numberOfCandidates) {
                          bestCandidateSoFar.cell = key;
                          bestCandidateSoFar.numberOfCandidates = candidatesForCell.length;
                          bestCandidateSoFar.value = candidatesForCell[0];
                      }
                  }
              })
          });
          return bestCandidateSoFar;
      }
    };

});

sudokoApp.directive('sudoko', function(Game, $rootScope) {

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
                for (var i = 0; i < 51; i++) {
                    var newCell = Game.bestCandidate();
                    console.log(newCell);

                    Game.set(newCell);
                    $scope.model = Game.get();

                }
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
