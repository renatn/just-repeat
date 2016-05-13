import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Actions from './actions';
import CardAnswerActions from './components/CardAnswerActions';
import CardItem from './components/CardItem';

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
			console.log(action);
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
}

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
}

const appStatus = (state = false, action) => {
	switch (action.type) {
		case 'START_MEMO':
			return true;
		case 'STOP_MEMO':
			return false;
		default:
			return state;
	}
};

const app = combineReducers({
	isStarted: appStatus,
	cards,
	memo
});

const store = createStore(app);



const Editor = (props) => {
	let inputFront = null,
		inputBack = null;

	const handleAdd = () => {
		store.dispatch(Actions.addCard(inputFront.value, inputBack.value));		
		inputFront.value = '';
		inputBack.value = '';
	};

	const handleView = () => {

	};

	const handleRemove = (front) => {
		store.dispatch({type: 'REMOVE_CARD', front});
	};

	const { cards } = props;

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
			<button onClick={handleView}>
				View 1
			</button>
			<ul>
				{cards.map((card, i) => <CardItem {...card} key={i} onRemove={handleRemove} />  )}
			</ul>
		</div>		
	);
}


const Player = ({ memo, cards }) => {
	const handleOK = () => store.dispatch(Actions.stopLearn());

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
	
	const handleAnswer = () => store.dispatch(Actions.answer(question.index)); 
	const handleDifficult = (level) => store.dispatch(Actions.cardLevel(card.front, level));

	return (
		<div>
		
			<div className="flashcard">
				<p className="flashcard__front">
					{card.front}
				</p>
				<p className={question.isAnswered ? '' : 'hidden'}>
					{card.back}
				</p>
			</div>

			<CardAnswerActions
				isAnswered={question.isAnswered} 
				onAnswer={handleAnswer} 
				onDifficult={handleDifficult} 
			/>

		</div>
	);
}

const FlashApp = (props) => {
	
	const { cards, isStarted, memo } = props;
	
	const handleStart = () => store.dispatch(Actions.startLearn(cards));
	
	const handleSave = () => {
		localStorage.setItem('react-flashcards', JSON.stringify(cards));
		alert(`Saved: ${cards.length} cards`);
	}
	
	const handleLoad = () => {
		store.dispatch(Actions.load());
	}

	const view = isStarted ? <Player cards={cards} memo={memo} /> : <Editor cards={cards} />;

	return (
		<div>
			<h1>FlashCards</h1>
			{view}	
			<div className={isStarted ? 'hidden' : ''}>
				<button disabled={!cards.length} onClick={handleStart}>
					Play
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
		<FlashApp {...store.getState()} />,
		document.getElementById('app')
	);		
};

store.subscribe(render);
render();
