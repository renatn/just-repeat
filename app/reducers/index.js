const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, {
        front: action.front,
        back: action.back,
        level: 0,
      }];
    case 'REMOVE_CARD':
      return state.filter((card) => card.front !== action.front);
    case 'DIFFICULTY_LEVEL':
      return state.map((card) => {
        if (card.front === action.front) {
          return {
            ...card,
            level: action.level,
          };
        }
        return card;
      });
    default:
      return state;
  }
};

export const player = (state = [], action) => {
  switch (action.type) {
    case 'START_STUDY':
      return action.cards
        .sort((a, b) => a.level - b.level)
        .map((card) => ({ ...card, isAnswered: false }));
    case 'SHOW_ANSWER':
      return state.map((card) => {
        if (card.front === action.front) {
          return {
            ...card,
            isAnswered: true,
          };
        }
        return card;
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

export const spa = (state = { showUndo: false }, action) => {
  switch (action.type) {
    case 'SHOW_UNDO':
      return { ...state, showUndo: true };
    case 'HIDE_UNDO':
      return { ...state, showUndo: false };
    default:
      return state;
  }
};

export const decks = (state = [], action) => {
  switch (action.type) {
    case 'SET_DECKS':
      return action.decks;
    case 'ADD_DECK':
      return [...state, {
        name: action.deck,
        cards: cards(undefined, {}),
      }];
    case 'UPDATE_DECK':
      return [
        ...state.slice(0, action.deckIndex),
        { ...state[action.deckIndex], name: action.deckName },
        ...state.slice(action.deckIndex + 1),
      ];
    case 'REMOVE_DECK':
      return state.filter(deck => deck.name !== action.deck);
    case 'ADD_CARD':
    case 'DIFFICULTY_LEVEL':
      return state.map(deck => {
        if (deck.name === action.deck) {
          return {
            ...deck,
            cards: cards(deck.cards, action),
          };
        }
        return deck;
      });
    default:
      return state;
  }
};
