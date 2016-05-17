const cards = (state = [], action) => {
	switch (action.type) {
		case 'SET_CARDS':
			return action.cards;
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
		case 'ROUTE':
			if (action.route == 'STUDY') {
				return action.cards.map((_, i) => ({index: i, isAnswered: false}));
			}
			return state;
		case 'SHOW_ANSWER':
			return state.map((m) => {
				if (m.index === action.index) {
					return {
						...m,
						isAnswered: true
					}
				}
				return m;
			});
		case 'DIFFICULTY_LEVEL':
			return state.slice(1)
		default: 
			return state;			
	}
};


const router = (state = 'START', action) => {
	switch (action.type) {
		case 'ROUTE':
			return action.route;
		default:
			return state;
	}
}

export {
	player,
	cards,
	router
}