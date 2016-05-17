const addCard = (front, back) => (
	{
		type: 'ADD_CARD',
		front,
		back
	}
);

const load = () => {
	const data = localStorage.getItem('react-flashcards') || '[]';
	const cards = JSON.parse(data);
	return {
		type: 'SET_CARDS',
		cards: cards
	};
};

const answer = (index) => (
	{ 
		type: 'SHOW_ANSWER', 
		index
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

const study = (cards) => {
	const sortedCards = cards.sort((a, b) => a.level - b.level);
	return	{
		type: 'ROUTE', 
		cards: sortedCards,
		route: 'STUDY'
	}
};


export default {
	addCard,
	study,
	load,
	answer,
	cardLevel,
	route
};