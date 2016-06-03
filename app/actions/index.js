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
  const found = getState().decks.find((deck) => deck.id === deckId);
  dispatch(startStudy(found.cards));
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
    name,
    color,
  });
  dispatch(routeRoot());
};

const updateDeck = (deckId, name, color) => dispatch => {
  dispatch({
    type: 'UPDATE_DECK',
    deckId,
    name,
    color,
  });
  dispatch(routeRoot());
};

const addCard = (deckId, front, back) => dispatch => {
  dispatch({
    type: 'ADD_CARD',
    deckId,
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

const studyDone = deckId => dispatch => {
  dispatch({
    type: 'STUDY_DONE',
    deckId,
  });
  dispatch(routeRoot());
};

const answer = (cardId) => (
  {
    type: 'SHOW_ANSWER',
    cardId,
  }
);

const cardLevel = (deckId, cardId, level) => (
  {
    type: 'DIFFICULTY_LEVEL',
    deckId,
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

const removeDeck = (deckId) => {
  return {
    type: 'REMOVE_DECK',
    deckId,
  };
};

const routeEditDeck = (deckId) => {
  return {
    type: 'ROUTE',
    route: '/EDIT_DECK',
    deckId,
  };
};

const removeCard = (deckId, cardId) => (
  {
    type: 'REMOVE_CARD',
    deckId,
    cardId,
  }
);

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
};
