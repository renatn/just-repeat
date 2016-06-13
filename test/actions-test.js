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
        id: '#123',
        cardId: '12',
      },
      {
        type: 'ROUTE',
        route: '/',
      }
    ];

    const store = mockStore({ decks: [{name: 'english', cards: []}] });
    store.dispatch(Actions.addCard('#123', 'awesome', 'классный'));
    
    const actions = store.getActions().map(a => {
      if (a.type === 'ADD_CARD') {
        return {
          ...a,
          cardId: '12'
        }
      }
      return a;
    });

    expect(actions)
      .to.deep.equal(expectedActions);
  });
});
