import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';

const plural = (n) => {
  switch (n) {
    case 1:
      return 'карточка';
    case 2:
    case 3:
    case 4:
      return 'карточки';
    default:
      return 'карточек';
  }
};

const DeckItem = ({ deck, onStudy, onAddCard, onBrowse, onRemove }) => {

  const handleStudy = () => onStudy(deck.name);
  const handleAddCard = (e) =>{
    e.preventDefault();
    onAddCard(deck.name);
  }
  const handleRemove = () => onRemove(deck.name);
  const handleBrowse = (e) => {
    e.preventDefault();
    console.log('cards', deck.cards);
    onBrowse(deck.cards);
  };

  return (
    <li className="deck">
      <div className="deck_top">
        <div className="deck__name">
          {deck.name}
        </div>
        <div>
          <a href="" className="deck__count" onClick={handleBrowse}>
            {deck.cards.length} {plural(deck.cards.length)}
          </a>
        </div>
      </div>
      <div className="deck__actions">
        <button className="btn btn--alt" onClick={handleStudy}>
          Учить
        </button>
        <button className="btn btn--alt" onClick={handleAddCard}>
          Пополнить
        </button>
        <button className="btn btn--alt" onClick={handleRemove}>
          Удалить
        </button>
      </div>
    </li>
  );
};


const DeckGrid = (props) => {
  if (props.decks.length === 0) {
    return null;
  }
  return (
    <ul className="deck-list">
      {props.decks.map((deck, i) => { 
        return <DeckItem key={i} deck={deck} {...props} />
      })}
      <li className="deck deck--empty">
        <a href="" className="btn-link" onClick={props.onAddDeck}>
          <span>
            Добавить колоду
          </span>
        </a>
      </li>
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
      onStudy: (deckName) => dispatch(Actions.study(deckName)),
      onBrowse: (cards) => dispatch(Actions.route('/BROWSE'), cards),
      onAddCard: (deckName) => dispatch(Actions.routeAddCard(deckName)),
      onRemove: (deckName) => dispatch(Actions.removeDeck(deckName)),
      onAddDeck: (e) => {
        e.preventDefault();
        dispatch(Actions.route('/ADD_DECK'));
      }
    }
  }
)(DeckGrid);
