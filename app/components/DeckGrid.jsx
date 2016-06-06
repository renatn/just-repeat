import React from 'react';

import { getDecks } from '../reducers/decks';
import DeckCell from './DeckCell';

const DeckGrid = (props) => {
  
  const decks = getDecks(props.decks);

  if (decks.length === 0) {
    return null;
  }

  const handleAddDeck = (e) => {
    e.preventDefault();
    props.routeAddDeck();
  };

  return (
    <ul className="deck-grid">
      {decks.map((deck, i) =>
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

DeckGrid.propTypes = {
  routeAddDeck: React.PropTypes.func,
  decks: React.PropTypes.object,
};

export default DeckGrid;
