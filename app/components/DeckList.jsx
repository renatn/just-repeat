import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';

const DeckItem = ({ deck, onStudy, onAddCard, onBrowse, onRemove }) => {

	const handleStudy = () => onStudy(deck);
	const handleAddCard = () => onAddCard(deck.name);
	const handleRemove = () => onRemove(deck.name);

	return (
		<li className="deck">
			<div className="deck__name">{deck.name} : {deck.cards.length}</div>
			<div className="deck__actions">
				<button className="btn btn--base" disabled={!deck.cards.length} onClick={handleStudy}>
					Учить
				</button>
				<button className="btn btn--base" onClick={handleAddCard}>
					Пополнить
				</button>
				<button className="btn btn--base" onClick={onBrowse}>
					Просмотр
				</button>
				<button className="btn btn--base" onClick={handleRemove}>
					Удалить
				</button>
			</div>
		</li>
	);
};


const DeckList = (props) => {
	return (
		<ul className="deck-list">
			{props.decks.map((deck, i) => {	
				return <DeckItem key={i} deck={deck} {...props} />
			})}
		</ul>
	);
};

export default connect(
	state => {
		return {
			decks: state.decks
		}
	},
	dispatch => {
		return {
			onStudy: (deck) => dispatch(Actions.routeStudy(deck)),
			onBrowse: (cards) => dispatch(Actions.route('BROWSE'), cards),
			onAddCard: (deckName) => dispatch(Actions.routeAddCard(deckName)),
			onRemove: (deckName) => dispatch(Actions.removeDeck(deckName))
		}
	}
)(DeckList);
