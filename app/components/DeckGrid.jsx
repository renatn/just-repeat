import React, { Component } from 'react';

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

const DeckItem = ({ deck, study, routeAddCard, route, removeDeck }) => {

  const handleStudy = () => study(deck.name);
  const handleAddCard = (e) =>{
    e.preventDefault();
    routeAddCard(deck.name);
  }
  const handleRemove = () => removeDeck(deck.name);
  const handleBrowse = (e) => {
    e.preventDefault();
    route('/BROWSE');
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

  const handleAddDeck = (e) => {
    e.preventDefault();
    props.routeAddDeck();
  };

  return (
    <ul className="deck-list">
      {props.decks.map((deck, i) => { 
        return <DeckItem key={i} deck={deck} {...props} />
      })}
      <li className="deck deck--empty">
        <a href="" className="btn-link" onClick={handleAddDeck}>
          <span>
            Добавить колоду
          </span>
        </a>
      </li>
    </ul>
  );
};

export default DeckGrid;
