const addCard = (deck, front, back) => (
	{
		type: 'ADD_CARD',
		deck,
		front,
		back
	}
);

const load = () => {
	const data = localStorage.getItem('react-flashcards-v1');
	if (!data) {
		return {
			type: 'NOPE'
		};
	}
	const decks = JSON.parse(data);
	return {
		type: 'SET_DECKS',
		decks
	};
};

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
	answer,
	cardLevel,
	route,
	routeAddCard,
	removeDeck
};