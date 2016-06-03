import { v4 } from 'node-uuid';
import cards from './cards';

const deck = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return {
        id: v4(),
        name: action.name,
        color: action.color,
        cards: cards(undefined, {}),
        lastTime: 0,
      };
    case 'UPDATE_DECK':
      return {
        ...state,
        name: action.name,
        color: action.color,
      };
    case 'ADD_CARD':
    case 'REMOVE_CARD':
    case 'DIFFICULTY_LEVEL':
      if (state.id !== action.deckId) {
        return state;
      }
      return {
        ...state,
        cards: cards(state.cards, action),
      };
    case 'STUDY_DONE':
      if (state.id !== action.deckId) {
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

const decks = (state = [], action) => {
  switch (action.type) {
    case 'SET_DECKS':
      return action.decks;
    case 'ADD_DECK':
      return [...state, deck(undefined, action)];
    case 'UPDATE_DECK':
      return state
              .filter(item => item.id === action.deckId)
              .map(item => deck(item, action));
    case 'REMOVE_DECK':
      return state.filter(d => d.id !== action.deckId);
    case 'ADD_CARD':
    case 'REMOVE_CARD':
    case 'DIFFICULTY_LEVEL':
      return state.map(item => deck(item, action));
    case 'STUDY_DONE':
      return state.map(item => deck(item, action)).sort(byLastTime);
    default:
      return state;
  }
};

export default decks;
