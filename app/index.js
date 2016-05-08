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

const addCard = (front, back) => {
	cards = [...cards, {
		front,
		back
	}];
	save(cards);
	render();
};

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
				{props.cards.map((card, i) => <li key={i}>{card.front} - {card.back}</li> )}
			</ul>
		</div>		
	);
}


const AnswerActions = (props) => {
	return (
		<div>
			<p>{props.back}</p>
			<div>
				<button>Easy</button>
				<button>Normal</button>				
				<button>Hard</button>
			</div>
		</div>
	);
}

const Player = (props) => {
	const question = props.memo[0];
	const card = props.cards[question.index];
	const handleAnswer = () => props.onAnswer(question); 

	let backView;
	if (question.isAnswered) {
		backView = <AnswerActions back={card.back} />
	} else {
		backView = (
			<button onClick={handleAnswer}>Answer</button>
		);
	}

	return (
		<div>
			<div>
				{card.front}
			</div>
			{backView}
		</div>
	);
}

const App = (props) => {
	const view = props.isStarted 
		? <Player cards={props.cards} memo={props.memo} onAnswer={props.onAnswer}/>
		: <Editor cards={props.cards} onAddCard={props.onAddCard} />

	return (
		<div>
			<h1>App</h1>
			{view}	
			<p>
				<button disabled={!props.cards.length} onClick={props.onStart}>
					Start
				</button>
			</p>
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
		onAnswer={showAnswer}
	/>, 
	document.getElementById('app')
);

 render();