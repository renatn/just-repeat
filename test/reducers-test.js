import { expect } from 'chai';
import Actions from '../app/actions';
import { cards, router } from '../app/reducers';

describe('cards reducer', () => {
  it('should return initial state', () => {
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

describe('router reducer', () => {
  it('should return initial state', () => {
    expect(router(undefined, {})).to.equal('START');
  });

  it('should handle STUDY', () => {
    expect(
      router('START', Actions.route('STUDY'))
    ).to.equal('STUDY');
  });
});