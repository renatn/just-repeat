import React from 'react';

import { getDecks } from '../reducers/decks';
import DeckCell from './DeckCell';

const FilterLink = ({ children, current, filter, onClick }) => {
  const isActive = current === filter;

  if (isActive) {
    return <span className="link-disabled">{children}</span>
  }

  const handleClick = (e) => {
    e.preventDefault();
    onClick(filter);
  };

  return (
    <a href="" className="link" onClick={handleClick}>{children}</a>
  );
};

FilterLink.propTypes = {
  children: React.PropTypes.node,
  current: React.PropTypes.string,
  filter: React.PropTypes.string,
  onClick: React.PropTypes.func,
};


const DeckGrid = (props) => {
  const decks = getDecks(props.decks, props.decksFilter);

  const handleAddDeck = (e) => {
    e.preventDefault();
    props.routeAddDeck();
  };

  return (
    <div>
      <div className="decks-filter">
        <FilterLink filter="ALL" current={props.decksFilter} onClick={props.setFilter}>
          Все
        </FilterLink>&nbsp;|&nbsp;
        <FilterLink filter="TODO" current={props.decksFilter} onClick={props.setFilter}>
          Учить
        </FilterLink>&nbsp;|&nbsp;
        <FilterLink filter="DONE" current={props.decksFilter} onClick={props.setFilter}>
          Повторенные
        </FilterLink>
      </div>    
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
    </div>
  );
};

DeckGrid.propTypes = {
  routeAddDeck: React.PropTypes.func,
  decks: React.PropTypes.object,
  decksFilter: React.PropTypes.string,
  setFilter: React.PropTypes.func,
};

export default DeckGrid;
