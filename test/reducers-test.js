import { expect } from 'chai';
import Actions from '../app/actions';
import { decks, router, player } from '../app/reducers';

describe('decks reducer', () => {
  it('should return initial state', () => {
    expect(decks(undefined, {})).to.deep.equal([]);
  });

  it('should handle ADD_DECK', () => {
  	expect(
  		decks(undefined, {
        type: 'ADD_DECK',
        name: 'English 101'
      })
    ).to.deep.equal(
  		[
  			{
  				name: 'English 101',
  				cards: [],
          color: undefined,
          lastTime: 0
  			}
  		]
  	);
  });

  it('should handle ADD_CARD', () => {
    expect(
      decks([{name: 'English 101', cards: []}], {
        type: 'ADD_CARD',
        front: 'awesome',
        back: '1',
        deck: 'English 101',
      })
    ).to.deep.equal(
      [{
        name: 'English 101',
        cards: [{
          front: 'awesome',
          back: '1',
          level: 0,
          nextTime: 0,
          lastTime: 0,
        }]
      }]
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
