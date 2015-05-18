'use strict';

var sudokoApp = angular.module('sudokoApp', ['ui.bootstrap']);

sudokoApp.constant('_', window._)
    .run(function($rootScope) {
       $rootScope._ = window._;
    }
);


sudokoApp.controller('sudokoCtrl', function($scope, Game) {
    var self = this;
    self.model = Game.get();

    $scope.model = Game.get();
 //   self.model = [{name: 's', value: 'e'}, {name: 'rs', value: 'ee'}, {name: 'ws', value: 'ew'}]
//    console.log('value of a2 is', $scope.model[a2]);
});

sudokoApp.directive('sudoko', function() {

   return {
       restrict: 'E',
//       controller: function($scope, Game) {
//
//           var sudokoController = this;
//           var cells = $scope.cells = [];
//
//
//           $scope.martin = 'my name';
//
//           $scope.bla = '############';

//           sudokoController.addCell = function(cellController) {
//               cells.push(cellController);
//               cellController.sudokoController = sudokoController;
//           };

//           function initialize() {
//               $scope.model = Game.get();
////               console.log($scope);
//           }

//           initialize();
   //    },
       transclude: true,
       replace: true,
       scope: {},
       template: '<div class="container-fluid"><button ng-click="solve()">Solve</button><div ng-transclude></div></div>'
   };
});

//sudokoApp.controller('SudokoController', function($scope, Game) {
//    $scope.model = Game.get();
//});

sudokoApp.directive('sudokoCell', function() {
    return {
//        controller: function() {
//            var cellController = this;
//        },
//        controllerAs: 'controller',
//        require: '^sudoko',
        restrict: 'E',
     //   transclude: true,
        replace: true,
        scope: {
            cellData: '='
        },
        template: '<div><div class="col-sm-1">cell id is {{ cellData.name }} and value is {{cellData.value}}</div><div ng-transclude></div></div>'
        //template: '<div><div class="col-sm-1"><input ng-model="cellinfo.value" /></div><div ng-transclude></div></div>',
//        link: function sudokoCellLink(scope, element, attrs, sudokoCtrl) {
      //      sudokoCtrl.addCell(scope.controller);
 //           console.log(sudokoCtrl);
 //           scope.bla = '############';
 //       }
    };
});


sudokoApp.factory('Game', function(_) {

    var self = this;

    var nextCandidates = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {}
    };

 //   console.log('begin', nextCandidates);

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
        a2: {
            name: 'a2',
            value: '4'
        }
//        a5: '8',
//        a7: '2',
//        b3: '8',
//        b4: '2',
//        b5: '6',
//        b8: '9',
//        c1: '7',
//        c6: '4',
//        c9: '3',
//        d2: '3',
//        d6: '2',
//        d9: '4',
//        e1: '1',
//        e5: '7',
//        e7: '5',
//        f3: '6',
//        f4: '5',
//        f8: '3',
//        g1: '9',
//        g4: '8',
//        g7: '1',
//        g8: '4',
//        h2: '6',
//        h6: '5',
//        h7: '9',
//        i1: '4',
//        i3: '7',
//        i5: '1',
//        i9: '5'
    };



    // easy
//var model = [];
//
//model[0] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[1] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[2] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[3] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[4] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[5] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[6] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[7] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];
//model[8] = [undefined, '4', undefined, undefined, '8', undefined, '2', undefined, undefined];



//var model =  {
//    a2: '4',
//    a5: '8',
//    a7: '2',
//    b3: '8',
//    b4: '2',
//    b5: '6',
//    b8: '9',
//    c1: '7',
//    c6: '4',
//    c9: '3',
//    d2: '3',
//    d6: '2',
//    d9: '4',
//    e1: '1',
//    e5: '7',
//    e7: '5',
//    f3: '6',
//    f4: '5',
//    f8: '3',
//    g1: '9',
//    g4: '8',
//    g7: '1',
//    g8: '4',
//    h2: '6',
//    h6: '5',
//    h7: '9',
//    i1: '4',
//    i3: '7',
//    i5: '1',
//    i9: '5'
//};


//var model =  {
//    a1: '7',
//    a8: '8',
//    b2: '5',
//    b4: '7',
//    b6: '2',
//    c2: '3',
//    c3: '6',
//    c5: '4', // 2
//    c6: '5',
//    c8: '2',
//    d2: '8',
//    d3: '5', // 3
//    d6: '1',
//    d7: '3',
//    f3: '2',
//    f4: '3',
//    f7: '8', //10
//    f8: '1',
//    g2: '7', //11
//    g4: '4',
//    g5: '8',
//    g7: '5',
//    g8: '3',
//    h4: '2', //12
//    h6: '3',
//    h8: '7',
//    i2: '6',
//    i9: '8'
//};

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
     //   console.log('model:', model);
        if (model[cell] !== '') {
     //       console.log('model:', cell, ' is defined');
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
      //  console.log('candidates rows are ', candidates.rows);
      //  console.log('candidates columns are ', candidates.columns);
      //  console.log('candidates squares are ', candidates.squares);

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
      setModel: function(newModel) {
          model = newModel;
          updateRowColumnsSquares();
      },
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

      getNextCandidates: function() {
          return nextCandidates;
      },

      getNextCandidate: function() {
          var bestCandidateSoFar = {
              cell: undefined,
              numberOfCandidates: 9,
              value: undefined
          };

          var nextCandidates = {
              1: {},
              2: {},
              3: {},
              4: {},
              5: {},
              6: {},
              7: {},
              8: {},
              9: {}
          };

          ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
              ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
                  var key = row + col;

                  if (model[key] !== '') {
                      return;
                  }
                  var candidatesForCell = possibleValues(key);

                  nextCandidates[candidatesForCell.length][key] = candidatesForCell;

//                  console.log('cell', key);
//                  console.log('nexcadid', nextCandidates['1']);
//                  for (cell in nextCandidates['1']) {
//                      return cell;
//                  }
//                  for (cell in nextCandidates[candidatesForCell.length]) {
//                      return cell;
//                  }
//                  nextCandidates['1'].forEach(function(cell) {
//                      return cell;
//                  });

//                  if (candidatesForCell.length === 1) {
//                      bestCandidateSoFar.cell = key;
//                      bestCandidateSoFar.numberOfCandidates = 1;
//                      bestCandidateSoFar.value = candidatesForCell[0];
//                      return bestCandidateSoFar;
//                  } else if (candidatesForCell.length === 0) {
//                      nextCandidates['0'][key] = true;
//                  } else {
//                      nextCandidates[candidatesForCell.length][key] = true;
//                  }

              })
          });

          if (nextCandidates['1']) {
              for (var cell in nextCandidates['1']) {
                  console.log('singlecell', nextCandidates['1']);

                  return nextCandidates['1'];
              }
          }


      },

      singleCellCandidate: function() {
          var bestCandidateSoFar = {
              cell: undefined,
              numberOfCandidates: 9,
              value: undefined
          };

          var result = _.map([1,2,3], function(n) {
              return n * 3;
          });
          console.log('result',result);

          ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
              ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
                  var key = row + col;
                  if (model[key] !== '') {
                      return;
                  }
                  var candidatesForCell = possibleValues(key);

        //          console.log('candidates for cell', key, ' are ', candidatesForCell);


                  if (candidatesForCell === undefined) {
                      return;
                  }

                  if (candidatesForCell.length === 1) {
          //            console.log('cell', key, 'has 1 candidate');
                      bestCandidateSoFar.cell = key;
                      bestCandidateSoFar.numberOfCandidates = 1;
                      bestCandidateSoFar.value = candidatesForCell[0];
                      return bestCandidateSoFar;
                  } else if (candidatesForCell.length === 0) {
                      nextCandidates['0'][key] = true;
                  } else {
            //          console.log('nc', nextCandidates);
            //          console.log('candidatesForCell', candidatesForCell);

                      nextCandidates[candidatesForCell.length][key] = true;
       //               nextCandidates = {city: 'sheffield'};
             //         console.log('nextCandidates[candidatesForCell.length][key]', nextCandidates[candidatesForCell.length][key]);
                  }

              })
          });
          return bestCandidateSoFar;
      }
    };

});

//sudokoApp.directive('sudoko', function(Game, $rootScope, _) {
//
//    function getTemplate() {
//        return '<div class="container-fluid"><button ng-click="solve()">Solve</button>' +
//            '<div class="row"><div class="col-md-1">&nbsp;</div><div class="col-md-1"><div class="input-group">1</div></div><div class="col-md-1"><div class="input-group">2</div></div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">3</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">4</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">5</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group" >6</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">7</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">8</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">9</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row">' +
//            '<div class="col-md-1">A</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.a9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row">' +
//            '<div class="col-md-1">B</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.b9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row" >' +
//            '<div class="col-md-1">C</div>' +
//            '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1"  style="border-right-style: solid;border-right-width: thin;border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.c9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row">' +
//            '<div class="col-md-1">D</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.d9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row">' +
//            '<div class="col-md-1">E</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin" >' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.e9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row"><div class="col-md-1">F</div><div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin"><div class="input-group">' +
//            '<input ng-model="model.f1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1"  style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.f9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row">' +
//            '<div class="col-md-1">G</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.g9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row">' +
//            '<div class="col-md-1">H</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.h9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '<div class="row">' +
//            '<div class="col-md-1">I</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i1" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i2" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i3" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i4" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i5" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1" style="border-right-style: solid;border-right-width: thin">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i6" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i7" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i8" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '<div class="col-md-1">' +
//            '<div class="input-group">' +
//            '<input ng-model="model.i9" type="text" class="form-control">' +
//            '</div>' +
//            '</div>' +
//            '</div></div>';
//    }
//
//    return {
//        scope: {},
//        controller: function($scope, $attrs) {
//
//            $scope.solve = function() {
//
//                console.log('solve the puzzle');
//                $scope.model = Game.get();
//                for (var i = 0; i < 91; i++) {
//                 //   var newCell = Game.singleCellCandidate();
//
//                    var newCell = Game.getNextCandidate();
//                    console.log('new cell',newCell);
//
//                    Game.set(newCell);
//                    $scope.model = Game.get();
//
//                }
//            };
//
//            function initialize() {
//               $scope.model = Game.get();
//            }
//
//            initialize();
//        },
//       // templateUrl: 'sudoko.html'
//        template: getTemplate()
//    }
//});
