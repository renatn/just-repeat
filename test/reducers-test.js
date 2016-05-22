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
        deck: 'English 101' 
      })
	).to.deep.equal(
		[
			{
				name: 'English 101',
				cards: []
			}
		]
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