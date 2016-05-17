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

const editor = (state = {}, action) => {
	switch (action.type) {
		case 'TOGGLE_CARDS_VIEW':
			return {...state, isShowCards: !state.isShowCards}
		default:
			return state;
	}
};

const memo = (state = [], action) => {
	switch (action.type) {
		case 'START_MEMO':
			return action.cards.map((_, i) => ({index: i, isAnswered: false}));
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

const status = (state = { isStarted: false, dirty: false, route: 'START' }, action) => {
	switch (action.type) {
		case 'START_MEMO':
			return {...state, isStarted: true};
		case 'STOP_MEMO':
			return {...state, isStarted: false, dirty: true};
		case 'ADD_CARD':
		case 'REMOVE_CARD':
			return {...state, dirty: true};
		case 'APP_SAVE':
			return {...state, dirty: false};
		case 'SHOW_ADD_CARD_FORM':
			return {...state, route: 'ADD_CARD'}
		case 'CLOSE_OVERLAY':
			return {...state, route: 'START'}
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
	status,
	memo,
	cards,
	editor,
	router
}