const startStudy = cards => ({
  type: 'START_STUDY',
  cards,
});

const load = () => dispatch => {
  const data = localStorage.getItem('react-flashcards-v1');
  if (!data) {
    return dispatch({ type: 'NOPE ' });
  }
  const decks = JSON.parse(data);
  return dispatch({
    type: 'SET_DECKS',
    decks,
  });
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
  const prev = localStorage.getItem('react-flashcards-v1.bak');
  localStorage.setItem('react-flashcards-v1', prev);

  dispatch(load());
  dispatch(closeUndo());
};

const addDeck = deckName => dispatch => {
  dispatch({
    type: 'ADD_DECK', 
    deck: deckName 
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

const answer = (front) => (
  { 
    type: 'SHOW_ANSWER', 
    front
  }
);

const cardLevel = (deck, front, level) => (
  { 
    type: 'DIFFICULTY_LEVEL', 
    deck,
    front, 
    level 
  }
);

const route = (route) => (
  {
    type: 'ROUTE',
    route
  }
);

const routeRoot = () => {
  return {
    type: 'ROUTE',
    route: '/'
  };
};

const routeAddCard = (deck) => {
  return {
    type: 'ROUTE', 
    route: '/ADD_CARD',
    deck
  };
};

const routeAddDeck = () => {
  return {
    type: 'ROUTE', 
    route: '/ADD_DECK'
  };
};

const removeDeck = (deckName) => {
  return {
    type: 'REMOVE_DECK', 
    deck: deckName
  };
};

const closeUndo = () => {
  return {
    type: 'HIDE_UNDO'
  };
};

const toggleDeckMenu = (deckName) => {
  return {
    type: 'TOGGLE_DECK_MENU',
    deckName
  }
}

export default {
  addCard,
  load,
  save,
  answer,
  cardLevel,
  addDeck,
  removeDeck,
  study,
  undo,
  closeUndo,
  browse,
  toggleDeckMenu,
  route,
  routeRoot,
  routeAddCard,
  routeAddDeck
};