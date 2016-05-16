import { expect } from 'chai';
import Actions from '../app/actions';
import { cards } from '../app/reducers';

describe('cards reducer', () => {
  it('should return initial state', () => {
    const expectedAction = {
      type: 'ADD_CARD',
      front: 'awesome',
      back: 'классный'
    };
    expect(cards(undefined, {})).to.deep.equal([]);
  });

  it('should handle ADD_CARD', () => {
  	expect(
  		cards(undefined, Actions.addCard('abc', 'qaz'))
	).to.deep.equal(
		[
			{
				front: 'abc',
				back: 'qaz',
				level: 0
			}
		]
	);
  });
});