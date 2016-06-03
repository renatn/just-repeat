import { expect } from 'chai';
import Actions from '../app/actions';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create actions to add a card', () => {
    const expectedActions = [
      {
        type: 'ADD_CARD',
        front: 'awesome',
        back: 'классный',
        deckId: '#123',
      },
      {
        type: 'ROUTE',
        route: '/',
      }
    ];

    const store = mockStore({ decks: [{name: 'english', cards: []}] });
    store.dispatch(Actions.addCard('#123', 'awesome', 'классный'));
    expect(store.getActions())
      .to.deep.equal(expectedActions);
  });
});
