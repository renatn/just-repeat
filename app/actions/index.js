const load = () => {
	return dispatch => {
		const data = localStorage.getItem('react-flashcards-v1');
		if (!data) {
			dispatch({type: 'NOPE'});
			return;
		}
		const decks = JSON.parse(data);
		dispatch({
			type: 'SET_DECKS',
			decks
		});
	}
};

const save = (decks) => {
	return dispatch => {
		localStorage.setItem('react-flashcards-v1', JSON.stringify(decks));
		dispatch({
			type: 'SAVE_SUCCESS',
			message: `Saved ${deck.length} decks`
		});
	};
}

const study = (deck) => {
	return dispatch => {		
		dispatch(startStudy(deck));
		dispatch(route('/STUDY'));
	}
}

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

const routeStudy = (deck) => {
	// const sortedCards = cards.sort((a, b) => a.level - b.level);
	return	{
		type: 'ROUTE', 
		route: 'STUDY',
		deck
	};
};

const routeAddCard = (deck) => {
	return {
		type: 'ROUTE', 
		route: 'ADD_CARD',
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
	routeStudy,
	load,
	save,
	answer,
	cardLevel,
	route,
	routeAddCard,
	addDeck,
	removeDeck
};