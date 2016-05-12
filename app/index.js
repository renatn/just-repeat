import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

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
		default:
			return state;
	}
}

const memo = (state = [], action) => {
	switch (action.type) {
		case 'START_MEMO':
			return action.cards.map((_, i) => ({index: i, isAnswered: false}));
		case 'SHOW_ANSWER':
			return state.map((m) => {
				if (m.index === action.index) {
					return {
						index: m.index,
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
}

const INITIAL_STATE = {
	cards: [],
	memo: [],
	isStarted: false
}

const flash = (state = INITIAL_STATE, action) => {

	const update = (opts) => {
		return Object.assign({}, state, opts);
	};

	switch (action.type) {
		case 'START_MEMO':
			return Object.assign({}, state, {
				memo: memo(state.memo, action),
				isStarted: true
			});
		case 'LOAD_CARDS':
			return update({cards: action.cards});
		case 'ADD_CARD':
			return Object.assign({}, state, {
				cards: cards(state.cards, action)
			});
		case 'REMOVE_CARD': 
			return Object.assign({}, state, {
				cards: cards(state.cards, action)
			});
		case 'SHOW_ANSWER':
			return Object.assign({}, state, {
				memo: memo(state.memo, action)
			});
		case 'DIFFICULTY_LEVEL':
			return Object.assign({}, state, {
				memo: memo(state.memo, action)
			});
		case 'STOP_MEMO':
			return Object.assign({}, state, {
				isStarted: false
			});
		default:
			return state;
	}
}

const store = createStore(flash);

const CardItem = ({front, back}) => {
	const handleRemove = () => store.dispatch({type: 'REMOVE_CARD', front});
	return (
		<li>
			{front} - {back} &nbsp; <button onClick={handleRemove}>X</button>
		</li>
	);
};

const Editor = (props) => {
	let inputFront = null,
		inputBack = null;

	const handleAdd = () => {
		store.dispatch({
			type: 'ADD_CARD',
			front: inputFront.value,
			back: inputBack.value
		});		
		inputFront.value = '';
		inputBack.value = '';
	};

	const { cards } = store.getState();

	return (
		<div>
			<p>
				<label>Front: &nbsp;</label>
				<input ref={(c) => inputFront = c} />
			</p>
			<p>
				<label>Back: &nbsp;</label>
				<input ref={(c) => inputBack = c} />
			</p>
			<button onClick={handleAdd}>
				Add
			</button>
			<ul>
				{cards.map((card, i) => <CardItem {...card} key={i} />  )}
			</ul>
		</div>		
	);
}

const AnswerActions = (props) => {
	const handleEasy = () => store.dispatch({ type: 'DIFFICULTY_LEVEL', level: 0});

	return (
		<div>
			<p>{props.back}</p>
			<div>
				<button onClick={handleEasy}>Easy</button>
				<button onClick={handleEasy}>Normal</button>				
				<button onClick={handleEasy}>Hard</button>
			</div>
		</div>
	);
}

const Player = (props) => {
	const { memo, cards } = store.getState();
	const handleOK = () => store.dispatch({ type: 'STOP_MEMO' });

	if (memo.length === 0) {
		return (
			<div>
				<h2>Test Passed!</h2>
				<button onClick={handleOK}>OK</button>
			</div>
		);
	}
	const question = memo[0];
	const card = cards[question.index];
	
	const handleAnswer = () => store.dispatch({ type: 'SHOW_ANSWER', index: question.index }); 
	return (
		<div>
			<div>
				{card.front}
			</div>
			<div className={question.isAnswered ? '' : 'hidden'}>
				<AnswerActions back={card.back} onDifficultyLevel={props.onDifficultyLevel}/>
			</div>
			<div className={question.isAnswered ? 'hidden' : ''}>
				<button onClick={handleAnswer}>Answer</button>
			</div>
		</div>
	);
}

const App = (props) => {
	
	const { cards, isStarted } = store.getState();
	
	const view = isStarted ? <Player /> : <Editor />;
	
	const handleStart = () => store.dispatch({ type: 'START_MEMO', cards });
	
	const handleSave = () => {
		localStorage.setItem('react-flashcards', JSON.stringify(cards));
		alert(`Saved: ${cards.length} cards`);
	}
	
	const handleLoad = () => {
		const data = localStorage.getItem('react-flashcards') || '[]';
		const cards = JSON.parse(data);
		store.dispatch({
			type: 'LOAD_CARDS',
			cards: cards
		});
		alert(`Loaded: ${cards.length} cards`);
	}

	return (
		<div>
			<h1>FlashCards</h1>
			{view}	
			<div className={isStarted ? 'hidden' : ''}>
				<button disabled={!cards.length} onClick={handleStart}>
					Start
				</button>
				<button onClick={handleLoad}>
					Load
				</button>
				<button onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
}


const render = () => {
	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);		
};

store.subscribe(render);
render();
