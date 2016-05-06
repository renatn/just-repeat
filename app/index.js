import React from 'react';
import ReactDOM from 'react-dom';

let cards = [];
let memo = [];
let isStarted = false

const addCard = (front, back) => {
	cards = [...cards, {
		front,
		back
	}];
	render();
};

const startMemo = () => {
	isStarted = true;
	memo = cards.map((_, i) => i);
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

const Player = (props) => {
	let back = '';
	const card = props.cards[props.memo[0]];
	const handleClick = () => back = card.back
	return (
		<div>
			<div>
				{card.front}
				<br />
				{back}
			</div>
			<button onClick={handleClick}>Answer</button>
		</div>
	);
}

const App = (props) => {
	
	const handleStart = () => props.onStart();

	const view = props.isStarted 
		? <Player cards={props.cards} memo={props.memo} />
		: <Editor cards={props.cards} onAddCard={props.onAddCard} />

	return (
		<div>
			<h1>App</h1>
			{view}	
			<p>
				<button disabled={!props.cards.length} onClick={handleStart}>
					Start
				</button>
			</p>
		</div>
	);
}

const render = () => ReactDOM.render(
	<App cards={cards} memo={memo} isStarted={isStarted} onAddCard={addCard} onStart={startMemo} />, 
	document.getElementById('app')
);

 render();