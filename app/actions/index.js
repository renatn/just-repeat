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
    message: `Saved ${decks.length} decks`
  });
};

const study = (deckName) => (dispatch, getState) => {
    const deck = getState().decks.find((deck) => deck.name === deckName);
    dispatch(startStudy(deck.cards));
    dispatch(route('/STUDY'));
  };
};

const startStudy = (cards) => {
  return {
    type: 'START_STUDY',
    cards
  };
};

const addDeck = (deckName) => {
  return dispatch => {
    dispatch({
      type: 'ADD_DECK', 
      deck: deckName 
    });
    dispatch(route('/'));
  }
};

const addCard = (deck, front, back) => (
  {
    type: 'ADD_CARD',
    deck,
    front,
    back
  }
);

const answer = (front) => (
  { 
    type: 'SHOW_ANSWER', 
    front
  }
);

const cardLevel = (front, level) => (
  { 
    type: 'DIFFICULTY_LEVEL', 
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

const routeAddCard = (deck) => {
  return {
    type: 'ROUTE', 
    route: '/ADD_CARD',
    deck
  };
};

const removeDeck = (deckName) => {
  return {
    type: 'REMOVE_DECK', 
    deck: deckName
  };
};


export default {
  addCard,
  load,
  save,
  answer,
  cardLevel,
  route,
  routeAddCard,
  addDeck,
  removeDeck,
  study
};