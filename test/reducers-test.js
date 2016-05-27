import { expect } from 'chai';
import Actions from '../app/actions';
import { decks, router } from '../app/reducers';

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