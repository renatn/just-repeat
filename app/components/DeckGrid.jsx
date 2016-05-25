import React, { Component } from 'react';
import classnames from 'classnames';

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

const DeckItem = ({ deck, study, routeAddCard, routeEditDeck, browse, removeDeck, toggleDeckMenu }) => {

  const handleStudy = () => study(deck.name);
  const handleAddCard = (e) =>{
    e.preventDefault();
    routeAddCard(deck.name);
  }
  const handleRemove = () => removeDeck(deck.name);
  const handleBrowse = (e) => {
    e.preventDefault();
    browse(deck.name);
  };
  const handleMenuToggle = (e) => {
    e.preventDefault();
    toggleDeckMenu(deck.name);
  };
  const handleEditDeck = (e) => {
    e.preventDefault();
    routeEditDeck(deck.name);
  };

  return (
    <li className="deck">
      <div className="deck__top">
        <a href="" title="Редактировать" className="deck__edit-btn" onClick={handleEditDeck}>
          &#9881;
        </a>
        <div className="deck__name">
          {deck.name}
        </div>
        <div>
          <a href="" className="deck__count" onClick={handleBrowse}>
            {deck.cards.length} {plural(deck.cards.length)}
          </a>
        </div>
      </div>
      <div className={classnames({ 'deck__actions': true, 'deck__actions--ext': deck.isMenuVisible })}>

        <div className="main-actions">
          <button className="btn btn--alt" onClick={handleStudy}>
            Учить
          </button>
          <button className="btn btn--alt" onClick={handleAddCard}>
            Пополнить
          </button>
        </div>

        <div className="ext-actions">
          <button className="btn btn--more" onClick={handleMenuToggle}>
            &#8942;
          </button>
          <div className="ext-actions__content">
            <button className="btn btn--alt" onClick={handleRemove}>
              Удалить
            </button>
          </div>
        </div>

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
    <ul className="deck-grid">
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
