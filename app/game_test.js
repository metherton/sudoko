'use strict';

xdescribe('game', function() {

    var Game, initialModel, _, $rootScope;

    beforeEach(module('myApp'));
    beforeEach(inject(function(_Game_) {
        Game = _Game_;
    }));


    describe('simple', function() {
        beforeEach(function() {
            initialModel =  {
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
                    if (initialModel[key] === undefined) {
                        initialModel[key] = '';
                    }
                })
            });
            Game.setModel(initialModel);
        });

        it ('should calculate best possible candidate to purge from all cells', function() {
//            expect(Game.singleCellCandidate()).toEqual({cell: 'd5', numberOfCandidates: 1, value: '9'});
            expect(Game.getNextCandidate()).toEqual({'d5': ['9']});
        });

    });

    describe('hard', function() {
        beforeEach(function(){
            initialModel =  {
                a1: '7',
                a8: '8',
                b2: '5',
                b4: '7',
                b6: '2',
                c2: '3',
                c3: '6',
                c5: '4', // 2
                c6: '5',
                c8: '2',
                d2: '8',
                d3: '5', // 3
                d6: '1',
                d7: '3',
                f3: '2',
                f4: '3',
                f7: '8', //10
                f8: '1',
                g2: '7', //11
                g4: '4',
                g5: '8',
                g7: '5',
                g8: '3',
                h4: '2', //12
                h6: '3',
                h8: '7',
                i2: '6',
                i9: '8'
            };
            ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
                ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
                    var key = row + col;
                    if (initialModel[key] === undefined) {
                        initialModel[key] = '';
                    }
                })
            });
            Game.setModel(initialModel);

        });

        it ('should not find a first singleCellCandidate', function() {
            expect(Game.singleCellCandidate()).toEqual({cell: undefined, numberOfCandidates: 9, value: undefined});
        });
        it ('should find a nextCandidates with 2 values', function() {
            Game.singleCellCandidate();
            var nextCandidates = Game.getNextCandidates();
            expect(nextCandidates['2']).toEqual({'a6':true,'d4':true,'f2':true,'g3':true,'g6':true,'i6':true,'i8':true});
        });



    });

});
