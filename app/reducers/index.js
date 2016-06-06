import { combineReducers } from 'redux';
import decks from './decks';

export const player = (state = [], action) => {
  switch (action.type) {
    case 'START_STUDY': {
      const now = Date.now();
      return action.cards
          .filter(c => c.nextTime <= now)
          .sort((a, b) => a.level - b.level)
          .map((c) => ({ ...c, isAnswered: false }));
    }
    case 'SHOW_ANSWER':
      return state.map(c => {
        if (c.id === action.cardId) {
          return {
            ...c,
            isAnswered: true,
          };
        }
        return c;
      });
    case 'DIFFICULTY_LEVEL':
      return state.slice(1);
    default:
      return state;
  }
};

export const router = (state = { route: '/' }, action) => {
  switch (action.type) {
    case 'ROUTE':
      return action;
    default:
      return state;
  }
};

const settings = (state = { showUndo: false, isDisclaimerOpen: true }, action) => {
  switch (action.type) {
    case 'SHOW_UNDO':
      return { ...state, showUndo: true };
    case 'HIDE_UNDO':
      return { ...state, showUndo: false };
    case 'SHOW_DISCLAIMER':
      return { ...state, isDisclaimerOpen: true };
    case 'HIDE_DISCLAIMER':
      return { ...state, isDisclaimerOpen: false };
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        ...state,
        userName: action.displayName,
        isAuthenticated: true,
        uid: action.uid
      };
    case 'USER_NOT_AUTHENTICATED':
      return {
        isAuthenticated: false
      }
    default:
      return state;
  }
}

const app = combineReducers({
  router,
  decks,
  player,
  settings,
  user,
});

export default app;
