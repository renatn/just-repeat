import { combineReducers } from 'redux';
import _mergeWith from 'lodash/mergeWith';
import _isArray from 'lodash/isArray';
import cards from './cards';

const deck = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return {
        id: action.id,
        name: action.name,
        color: action.color,
        cards: cards(undefined, {}),
        lastTime: 0,
      };
    case 'UPDATE_DECK':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        name: action.name,
        color: action.color,
      };
    case 'ADD_CARD':
    case 'REMOVE_CARD':
    case 'DIFFICULTY_LEVEL':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        cards: cards(state.cards, action),
      };
    case 'STUDY_DONE':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        lastTime: Date.now(),
      };
    default:
      return state;
  }
};

const valN = (n) => (isNaN(n) ? 0 : n);
const byLastTime = (a, b) => valN(a.lastTime) - valN(b.lastTime);

const syncDecks = (a, b) => _mergeWith({}, a, b, (aCards, bCards) => {
  if (_isArray(aCards)) {
    return aCards
            .filter(card => !bCards.some(bCard => bCard.id === card.id))
            .concat(bCards);
  }
});

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DECK':
    case 'UPDATE_DECK':
    case 'ADD_CARD':
    case 'REMOVE_CARD':
    case 'DIFFICULTY_LEVEL':
    case 'STUDY_DONE':
      return {
        ...state,
        [action.id]: deck(state[action.id], action),
      };
    case 'REMOVE_DECK':
      const result = {
        ...state,
        [action.id]: undefined,
      };
      delete result[action.id];
      return result;
    case 'UNDO':
      return action.decks;
    case 'RECEIVE_DECKS':
      return syncDecks(state, action.decks);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return [...state, action.id];
    case 'REMOVE_DECK':
      return state.filter(id => id !== action.id);
    case 'UNDO':
    case 'RECEIVE_DECKS':
      const ids = Object.keys(action.decks);
      return state.filter(id => ids.indexOf(id) === -1).concat(ids);
    default:
      return state;
  }
};

const decks = combineReducers({
  byId,
  allIds,
});
export default decks;

export const getDecks = (state) =>
  state.allIds.map(id => state.byId[id]).sort(byLastTime);

export const getDeckById = (state, id) => state.byId[id];

/* const decks = (state = [], action) => {
  switch (action.type) {
    case 'SET_DECKS':
      return action.decks;
    default:
      return state;
  }
};
*/
