import { v4 } from 'node-uuid';

const levelToMinutes = (k, level) => {
  switch (level) {
    case 0: // easy
      return 1000 * 60 * 60 * 24 * k;
    case 1: // normal
      return 1000 * 60 * 60 * k;
    case 2: // hard
      return 1000 * 60;
    default:
      return 1000;
  }
};

const card = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        id: action.cardId,
        front: action.front,
        back: action.back,
        level: 0,
        lastTime: Date.now(),
        nextTime: Date.now(),
      };
    case 'DIFFICULTY_LEVEL': {
      if (state.id !== action.cardId) {
        return state;
      }

      const lastTime = Date.now();
      const prevTime = state.lastTime || lastTime;
      const nextTime = prevTime + levelToMinutes((lastTime / prevTime), action.level);
      return {
        ...state,
        level: action.level,
        lastTime,
        nextTime,
      };
    }
    default:
      return state;
  }
};

const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, card(undefined, action)];
    case 'REMOVE_CARD':
      return state.filter(c => c.id !== action.cardId);
    case 'DIFFICULTY_LEVEL':
      return state.filter(item => item.id === action.cardId).map(item => card(item, action));
    default:
      return state;
  }
};

export default cards;
