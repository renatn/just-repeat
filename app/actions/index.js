import { v4 } from 'node-uuid';
import { loadState, restoreState } from '../utils';

const closeUndo = () => ({
  type: 'HIDE_UNDO',
});

const routeRoot = () => ({
  type: 'ROUTE',
  route: '/',
});

const startStudy = cards => ({
  type: 'START_STUDY',
  cards,
});

const hideDisclaimer = () => dispatch => {
  localStorage.setItem('hide-disclaimer', 'true');
  dispatch(
    {
      type: 'HIDE_DISCLAIMER',
    }
  );
};

const study = deckId => (dispatch, getState) => {
  const deck = getState().decks.byId[deckId];
  dispatch(startStudy(deck.cards));
  dispatch({ type: 'ROUTE', route: '/STUDY', deckId });
};

const undo = () => dispatch => {
  restoreState();

  const { decks } = loadState();
  dispatch({
    type: 'SET_DECKS',
    decks,
  });

  dispatch(closeUndo());
};

const addDeck = (name, color) => dispatch => {
  dispatch({
    type: 'ADD_DECK',
    id: v4(),
    name,
    color,
  });
  dispatch(routeRoot());
};

const updateDeck = (id, name, color) => dispatch => {
  dispatch({
    type: 'UPDATE_DECK',
    id,
    name,
    color,
  });
  dispatch(routeRoot());
};

const addCard = (id, front, back) => dispatch => {
  dispatch({
    type: 'ADD_CARD',
    id,
    cardId: v4(),
    front,
    back,
  });

  dispatch(routeRoot());
};

const browse = (deckId) => dispatch => {
  dispatch({
    type: 'ROUTE',
    route: '/BROWSE',
    deckId,
  });
};

const studyDone = id => dispatch => {
  dispatch({
    type: 'STUDY_DONE',
    id,
  });
  dispatch(routeRoot());
};

const answer = (cardId) => (
  {
    type: 'SHOW_ANSWER',
    cardId,
  }
);

const cardLevel = (id, cardId, level) => (
  {
    type: 'DIFFICULTY_LEVEL',
    id,
    cardId,
    level,
  }
);

const route = (route) => (
  {
    type: 'ROUTE',
    route,
  }
);

const routeAddCard = deckId => ({
  type: 'ROUTE',
  route: '/ADD_CARD',
  deckId,
});

const routeAddDeck = () => {
  return {
    type: 'ROUTE',
    route: '/ADD_DECK',
  };
};

const removeDeck = (id) => {
  return {
    type: 'REMOVE_DECK',
    id,
  };
};

const routeEditDeck = (deckId) => {
  return {
    type: 'ROUTE',
    route: '/EDIT_DECK',
    deckId,
  };
};

const removeCard = (id, cardId) => (
  {
    type: 'REMOVE_CARD',
    id,
    cardId,
  }
);

const userAuthenticated = user => ({
  type: 'USER_AUTHENTICATED',
  ...user
});

const userNotAuthenticated = () => ({
  type: 'USER_NOT_AUTHENTICATED'
});

const receiveDecks = (decks) => ({
  type: 'RECEIVE_DECKS',
  decks,
});

export default {
  addCard,
  removeCard,
  answer,
  cardLevel,
  addDeck,
  updateDeck,
  removeDeck,
  study,
  undo,
  closeUndo,
  browse,
  studyDone,
  route,
  routeRoot,
  routeAddCard,
  routeAddDeck,
  routeEditDeck,
  startStudy,
  hideDisclaimer,
  userAuthenticated,
  userNotAuthenticated,
  receiveDecks,
};
