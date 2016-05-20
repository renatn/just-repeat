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
			<ul className="deck__actions">
				<li className="action-item">
					<a className="" onClick={handleStudy}>
						Учить
					</a>
				</li>
				<li className="action-item">
					<a className="" onClick={handleAddCard}>
						Пополнить
					</a>
				</li>
				<li className="action-item">
					<a className="" onClick={onBrowse}>
						Просмотр
					</a>
				</li>
				<li className="action-item">
		 			<a className="" onClick={handleRemove}>
						Удалить
					</a>
				</li>
			</ul>
		</li>
	);
};


const DeckList = (props) => {
	if (props.decks.length === 0) {
		return null;
	}
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
