'use strict';

describe('game', function() {

    var Game, initialModel;

    beforeEach(module('myApp'));
    beforeEach(inject(function(_Game_){
        Game = _Game_;

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
    }));

    it('should initialize model', function() {
        expect(Game.get()).toEqual(initialModel);
        var candidates = Game.getCandidates();
        expect(candidates.rows.a).toEqual(['1', '3', '5', '6', '7', '9']);
    })

});
