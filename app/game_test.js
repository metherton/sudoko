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
        expect(candidates.rows.b).toEqual(['1', '3', '4', '5', '7']);
        expect(candidates.rows.c).toEqual(['1', '2', '5', '6', '8', '9']);
        expect(candidates.rows.d).toEqual(['1', '5', '6', '7', '8', '9']);
        expect(candidates.rows.e).toEqual(['2', '3', '4', '6', '8', '9']);
        expect(candidates.rows.f).toEqual(['1', '2', '4', '7', '8', '9']);
        expect(candidates.rows.g).toEqual(['2', '3', '5', '6', '7']);
        expect(candidates.rows.h).toEqual(['1', '2', '3', '4', '7', '8']);
        expect(candidates.rows.i).toEqual(['2', '3', '6', '8', '9']);
        expect(candidates.columns['1']).toEqual(['2', '3', '5', '6', '8']);
        expect(candidates.columns['2']).toEqual(['1', '2', '5', '7', '8', '9']);
        expect(candidates.columns['3']).toEqual(['1', '2', '3', '4', '5', '9']);
        expect(candidates.columns['4']).toEqual(['1', '3', '4', '6', '7', '9']);
        expect(candidates.columns['5']).toEqual(['2', '3', '4', '5', '9']);
        expect(candidates.columns['6']).toEqual(['1', '3', '6', '7', '8', '9']);
        expect(candidates.columns['7']).toEqual(['3', '4', '6', '7','8']);
        expect(candidates.columns['8']).toEqual(['1', '2', '5', '6', '7', '8']);
        expect(candidates.columns['9']).toEqual(['1', '2', '6', '7', '8', '9']);
        expect(candidates.squares['1_1']).toEqual(['1', '2', '3', '5', '6', '9']);
        expect(candidates.squares['1_2']).toEqual(['1', '3', '5', '7', '9']);
        expect(candidates.squares['1_3']).toEqual(['1', '4', '5', '6', '7', '8']);
        expect(candidates.squares['2_1']).toEqual(['2', '4', '5', '7', '8', '9']);
        expect(candidates.squares['2_2']).toEqual(['1', '3', '4', '6', '8', '9']);
        expect(candidates.squares['2_3']).toEqual(['1', '2', '6', '7', '8', '9']);
        expect(candidates.squares['3_1']).toEqual(['1', '2', '3', '5', '8']);
        expect(candidates.squares['3_2']).toEqual(['2', '3', '4', '6', '7', '9']);
        expect(candidates.squares['3_3']).toEqual(['2', '3', '6', '7', '8']);

    })

});
