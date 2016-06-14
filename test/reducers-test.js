import { describe, it } from 'mocha';
import { expect } from 'chai';
import Actions from '../app/actions';
import { router, player } from '../app/reducers';
import decks, { getDecks } from '../app/reducers/decks';

describe('decks reducer', () => {

  it('should return initial state', () => {
    expect(decks(undefined, {})).to.deep.equal({ byId: {}, allIds: []});
  });

  it('should handle ADD_DECK', () => {
    const state = decks(undefined, {
        type: 'ADD_DECK',
        name: 'English 101',
        color: '#ff00ff',
        id: '1-2-3'
    });

    const result = getDecks(state);

  	expect(result.length).to.equal(1);
    expect(result[0]).to.deep.equal({
      name: 'English 101',
      color: '#ff00ff',
      id: '1-2-3',
      cards: [],
      lastTime: 0,
    });
  });

  it('should handle ADD_CARD', () => {

    const state = decks(undefined, {
        type: 'ADD_DECK',
        name: 'English 101'
    });


    expect(
      decks(state, {
        type: 'ADD_CARD',
        front: 'awesome',
        back: '1',
        id: '123',
        cardId: 'abc'
      })
    ).to.deep.equal(
      state
    );
  });

  it('should handle DIFFICULTY_LEVEL', () => {

    const initial = [
      {
        name: 'ISSUES',
        cards: [
          {
            front: '1'
          }
        ]
      }
    ];

    const actual = decks(initial, Actions.cardLevel('ISSUES', '1', 2));
    const card = actual[0].cards[0];

    expect(card.nextTime - card.lastTime).to.deep.equal(60000);
  });

  it('should handle RECEIVE_DECKS', () => {
    const state = {
      byId: {
        '1-2-3': {
          id: '1-2-3',
          cards: [
            {
              front: 'a',
              id: 'a-b-c'
            },
            {
              front: 'b',
              id: 'c-b-a'
            }
          ]
        },
      }
    }

    const fromFirebase = {
      '1-2-3': {
        id: '1-2-3',
        cards: [
            {
              front: 'a',
              id: 'a-b-c'
            },
            {
              front: 'x',
              id: 'x-x-x'
            }
        ]
      },
      '3-2-1': {
        id: '3-2-1'
      }
    }

    const expected = {
      '1-2-3': {
        id: '1-2-3',
        cards: [

            {
              front: 'b',
              id: 'c-b-a'
            },
            {
              front: 'a',
              id: 'a-b-c'
            },
            {
              front: 'x',
              id: 'x-x-x'
            }
        ]
      },
      '3-2-1': {
        id: '3-2-1'
      }
    };

    const { byId } = decks(state, {
      type: 'RECEIVE_DECKS',
      decks: fromFirebase,
    });
    // console.log(JSON.stringify(byId));
    expect(byId).to.deep.equal(expected);
  });

});

describe('router reducer', () => {
  it('should return initial state', () => {
    expect(router(undefined, {})).to.deep.equal({route: '/'});
  });

  it('should handle STUDY', () => {
    expect(
      router({route: '/'}, Actions.route('/STUDY'))
    ).to.deep.equal({ route: '/STUDY', type: 'ROUTE' });
  });
});

describe('player reducer', () => {
  it('should return initial state', () => {
    expect(player(undefined, {})).to.deep. equal([]);
  });

  it('should handle START_STUDY', () => {

    const cards = [
      {
        front: 'TO STUDY',
        lastTime: 0,
        nextTime: Date.now()
      },
      {
        front: 'ALREADY STUDIED',
        lastTime: 0,
        nextTime: Date.now() + 60000
      },
    ];

    const cardsToStudy = player(undefined, Actions.startStudy(cards))
    expect(cardsToStudy.length).to.equal(1);

  });

  it('should handle DIFFICULTY_LEVEL', () => {
    expect(
      player([{}], Actions.cardLevel('_', '1', 2))
    ).to.deep.equal([]);
  });
});
