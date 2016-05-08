import React from 'react';
import ReactDOM from 'react-dom';

let cards = [];
let memo = [];
let isStarted = false

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

const showAnswer = (card) => {
	memo = memo.map((m) => {
		if (m.index === card.index) {
			return {
				index: m.index,
				isAnswered: true
			}
		}
		return m;
	});
	render();
}

const nextCard = (level) => {
	memo = memo.slice(1);
	render();
}

const addCard = (front, back) => {
	cards = [...cards, {
		front,
		back
	}];
	save(cards);
	render();
};

const stop = () => {
	isStarted = false;
	render();
}

const startMemo = () => {
	isStarted = true;
	memo = cards.map((_, i) => ({index: i, isAnswered: false}));
	render();
}

const Editor = (props) => {
	let inputFront = null,
		inputBack = null;

	const handleAdd = () => {		
		props.onAddCard(inputFront.value, inputBack.value);
		inputFront.value = '';
		inputBack.value = '';
	}

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
				{props.cards.map((card, i) => <li key={i}>
					{card.front} - {card.back} &nbsp; <button>X</button>
				</li> )}
			</ul>
		</div>		
	);
}


const AnswerActions = (props) => {
	const handleEasy = () => {
		props.onDifficultyLevel(0);
	}

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

	const handleOK = () => stop();

	if (props.memo.length === 0) {
		return (
			<div>
				<h2>Test Passed!</h2>
				<button onClick={handleOK}>OK</button>
			</div>
		);
	}
	const question = props.memo[0];
	const card = props.cards[question.index];
	const handleAnswer = () => props.onAnswer(question); 
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
	const view = props.isStarted 
		? <Player cards={props.cards} memo={props.memo} onDifficultyLevel={props.onDifficultyLevel} onAnswer={props.onAnswer}/>
		: <Editor cards={props.cards} onAddCard={props.onAddCard} />
	return (
		<div>
			<h1>App</h1>
			{view}	
			<div className={props.isStarted ? 'hidden' : ''}>
				<button disabled={!props.cards.length} onClick={props.onStart}>
					Start
				</button>
			</div>
		</div>
	);
}

cards = load();
const render = () => ReactDOM.render(
	<App
		cards={cards} 
		memo={memo} 
		isStarted={isStarted}
		onAddCard={addCard} 
		onStart={startMemo}
		onDifficultyLevel={nextCard}
		onAnswer={showAnswer}
	/>, 
	document.getElementById('app')
);

 render();