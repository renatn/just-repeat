import { expect } from 'chai';
import Actions from '../app/actions';

describe('actions', () => {
  it('should create an action to add a card', () => {
    const expectedAction = {
      type: 'ADD_CARD',
      front: 'awesome',
      back: 'классный',
      deck: 'english'
    };
    expect(Actions.addCard('english', 'awesome', 'классный'))
    	.to.deep.equal(expectedAction);
  });
});