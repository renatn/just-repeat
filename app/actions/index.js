const addCard = (front, back) => (
	{
		type: 'ADD_CARD',
		front,
		back
	}
);

const startLearn = (cards) => {
	const sortedCards = cards.sort((a, b) => a.level - b.level);
	return	{
		type: 'START_MEMO', 
		cards: sortedCards 
	}
};

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

const stopLearn = () => (
	{ 
		type: 'STOP_MEMO' 
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


export default {
	addCard,
	startLearn,
	load,
	answer,
	stopLearn,
	cardLevel,
	route
};