import React from 'react';

import DeckCell from './DeckCell';

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
      {props.decks.map((deck, i) =>
        <DeckCell key={i} deck={deck} {...props} />
      )}
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
