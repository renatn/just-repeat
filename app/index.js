import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const cards = (state = [], action) => {
	switch (action.type) {
		case 'ADD_CARD': 
			return [...state, {
				front: action.front,
				back: action.back
			}];
		case 'REMOVE_CARD': 
			return state.filter((card) => card.front !== action.front);
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
	switch (action.type) {
		case 'START_MEMO':
			return Object.assign({}, state, {
				memo: state.cards.map((_, i) => ({index: i, isAnswered: false})),
				isStarted: true
			});
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
				memo: state.memo.map((m) => {
					if (m.index === action.index) {
						return {
							index: m.index,
							isAnswered: true
						}
					}
					return m;
				})
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
	
	const handleOK = () => store.dispatch({ type: 'STOP_MEMO' });
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
	const handleStart = () => store.dispatch({ type: 'START_MEMO' });
	return (
		<div>
			<h1>App</h1>
			{view}	
			<div className={isStarted ? 'hidden' : ''}>
				<button disabled={!cards.length} onClick={handleStart}>
					Start
				</button>
			</div>
		</div>
	);
}


const render = () => {
	console.log(store.getState());
	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);		
};

store.subscribe(render);
render();

/*

const load = () => {
	const data = localStorage.getItem('react-flashcards');
	if (!data) {
		return [];
	}
	return JSON.parse(data);
}

const save = (cards) => {
	localStorage.setItem('react-flashcards', JSON.stringify(cards));
}

const nextCard = (level) => {
	memo = memo.slice(1);
	render();
}

const stop = () => {
	isStarted = false;
	render();
}

*/