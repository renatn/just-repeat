const cards = (state = [], action) => {
	switch (action.type) {
		case 'ADD_CARD': 
			return [...state, {
				front: action.front,
				back: action.back,
				level: 0
			}];
		case 'REMOVE_CARD': 
			return state.filter((card) => card.front !== action.front);
		case 'DIFFICULTY_LEVEL':
			return state.map((card) => {
				if (card.front === action.front) {
					return {
						...card,
						level: action.level
					}
				}
				return card;
			});

		default:
			return state;
	}
};

const player = (state = [], action) => {
	switch (action.type) {
		case 'START_STUDY':
			return action.cards.map((card) => ({...card, isAnswered: false}));
		case 'SHOW_ANSWER':
			return state.map((card) => {
				if (card.front === action.front) {
					return {
						...card,
						isAnswered: true
					}
				}
				return card;
			});
		case 'DIFFICULTY_LEVEL':
			return state.slice(1)
		default: 
			return state;			
	}
};

const router = (state = {route: '/'}, action) => {
	switch (action.type) {
		case 'ROUTE':
			return action;
		default:
			return state;
	}
};

const decks = (state = [], action) => {
	switch (action.type) {
		case 'SET_DECKS':
			return action.decks
		case 'ADD_DECK':
			return [...state, {
				name: action.deck,
				cards: cards(undefined, {})
			}];
		case 'REMOVE_DECK':
			return state.filter(deck => deck.name !== action.deck);
		case 'ADD_CARD': 			
		case 'DIFFICULTY_LEVEL':
			return state.map(deck => {
				if (deck.name === action.deck) {
					return {
						...deck, 
						cards: cards(deck.cards, action)
					}
				}
				return deck;
			});			
		default:
			return state;
	}
};


export {
	router,
	player,
	decks
}