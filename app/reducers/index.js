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
        id: v4(),
        front: action.front,
        back: action.back,
        level: 0,
        lastTime: 0,
        nextTime: 0,
      };
    case 'DIFFICULTY_LEVEL': {
      if (state.front !== action.front) {
        return state;
      }

      const lastTime = Date.now();
      const prevTime = state.lastTime || lastTime;
      const nextTime = lastTime + levelToMinutes((lastTime / prevTime), action.level);
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
      return state.filter(c => c.front !== action.front);
    case 'DIFFICULTY_LEVEL':
      return state.map(item => card(item, action));
    default:
      return state;
  }
};

export const player = (state = [], action) => {
  switch (action.type) {
    case 'START_STUDY':
      const now = Date.now();
      return action.cards
        .filter(c => c.nextTime <= now)
        .sort((a, b) => a.level - b.level)
        .map((c) => ({ ...c, isAnswered: false }));
    case 'SHOW_ANSWER':
      return state.map(c => {
        if (c.front === action.front) {
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

export const spa = (state = { showUndo: false, isDisclaimerOpen: false }, action) => {
  switch (action.type) {
    case 'SHOW_UNDO':
      return { ...state, showUndo: true };
    case 'HIDE_UNDO':
      return { ...state, showUndo: false };
    case 'SHOW_DISCLAIMER':
      return { ...state, isDisclaimerOpen: true }
    case 'HIDE_DISCLAIMER':
      return { ...state, isDisclaimerOpen: false }
    default:
      return state;
  }
};

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
    case 'ADD_CARD':
    case 'DIFFICULTY_LEVEL':
      if (state.name !== action.deck) {
        return state;
      }
      return {
        ...state,
        cards: cards(state.cards, action),
      };
    case 'STUDY_DONE':
      if (state.name !== action.deckName) {
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

export const decks = (state = [], action) => {
  switch (action.type) {
    case 'SET_DECKS':
      return action.decks;
    case 'ADD_DECK':
      return [...state, deck(undefined, action)];
    case 'UPDATE_DECK':
      return [
        ...state.slice(0, action.index),
        { ...state[action.index], name: action.name, color: action.color },
        ...state.slice(action.index + 1),
      ];
    case 'REMOVE_DECK':
      return state.filter(d => d.name !== action.deck);
    case 'ADD_CARD':
    case 'DIFFICULTY_LEVEL':
      return state.map(item => deck(item, action));
    case 'STUDY_DONE':
      return state.map(item => deck(item, action)).sort(byLastTime);
    default:
      return state;
  }
};
