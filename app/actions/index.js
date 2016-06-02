import { loadState, restoreState } from '../utils';

const startStudy = cards => ({
  type: 'START_STUDY',
  cards,
});

const hideDisclaimer = () => dispatch => {
  localStorage.setItem('hide-disclaimer', 'true');
  dispatch(
    {
      type: 'HIDE_DISCLAIMER'
    }
  );
};

const save = (decks) => dispatch => {
  localStorage.setItem('react-flashcards-v1', JSON.stringify(decks));
  dispatch({
    type: 'SAVE_SUCCESS',
    message: `Saved ${decks.length} decks`,
  });
};

const study = deckName => (dispatch, getState) => {
  const found = getState().decks.find((deck) => deck.name === deckName);
  dispatch(startStudy(found.cards));
  dispatch({ type: 'ROUTE', route: '/STUDY', deck: deckName });
};

const undo = () => dispatch => {
  restoreState();

  const { decks } = loadState();
  dispatch({
    type: 'SET_DECKS',
    decks
  });

  dispatch(closeUndo());
};

const addDeck = (name, color) => dispatch => {
  dispatch({
    type: 'ADD_DECK',
    name: name,
    color: color,
  });
  dispatch(routeRoot());
};

const updateDeck = (index, name, color) => dispatch => {
  dispatch({
    type: 'UPDATE_DECK',
    index,
    name,
    color,
  });
  dispatch(routeRoot());
};

const addCard = (deck, front, back) => dispatch => {
  dispatch({
    type: 'ADD_CARD',
    deck,
    front,
    back,
  });

  dispatch(routeRoot());
};

const browse = (deckName) => dispatch => {
  dispatch({
    type: 'ROUTE',
    route: '/BROWSE',
    deck: deckName,
  });
};

const studyDone = deckName => dispatch => {
  dispatch({
    type: 'STUDY_DONE',
    deckName,
  });
  dispatch(routeRoot());
};

const answer = (front) => (
  {
    type: 'SHOW_ANSWER',
    front,
  }
);

const cardLevel = (deck, front, level) => (
  {
    type: 'DIFFICULTY_LEVEL',
    deck,
    front,
    level,
  }
);

const route = (route) => (
  {
    type: 'ROUTE',
    route,
  }
);

const routeRoot = () => {
  return {
    type: 'ROUTE',
    route: '/',
  };
};

const routeAddCard = (deck) => {
  return {
    type: 'ROUTE',
    route: '/ADD_CARD',
    deck,
  };
};

const routeAddDeck = () => {
  return {
    type: 'ROUTE',
    route: '/ADD_DECK',
  };
};

const removeDeck = (deckName) => {
  return {
    type: 'REMOVE_DECK',
    deck: deckName,
  };
};

const closeUndo = () => {
  return {
    type: 'HIDE_UNDO',
  };
};

const routeEditDeck = (deckName) => {
  return {
    type: 'ROUTE',
    route: '/EDIT_DECK',
    deckName,
  };
};

export default {
  addCard,
  save,
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
  hideDisclaimer
};
