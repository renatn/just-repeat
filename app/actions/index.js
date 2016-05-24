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

const study = (deckName) => {
	return (dispatch, getState) => {	
		const deck = getState().decks.find((deck) => deck.name === deckName);	
		dispatch(startStudy(deck.cards));
		dispatch({type: 'ROUTE', route: '/STUDY', deck: deckName});
	};
};

const undo = () => {
	return (dispatch) => {
		const prev = localStorage.getItem('react-flashcards-v1.bak');
		localStorage.setItem('react-flashcards-v1', prev);

		dispatch(load());
		dispatch(closeUndo());
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

const closeUndo = () => {
	return {
		type: 'HIDE_UNDO'
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
	study,
	undo,
	closeUndo
};