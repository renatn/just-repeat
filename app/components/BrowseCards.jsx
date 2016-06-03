import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardItem from './CardItem';

export default class BrowseCards extends Component {

  render() {
    const { router, decks } = this.props;
    const deck = decks.find(deck => deck.id === router.deckId);

    return (
      <div>
        <header className="overlay__title">
          <h1>{deck.name}</h1>
        </header>
        <ul>
          {
            deck.cards.map((card, i) =>
              <CardItem {...card} key={i} onRemove={this.props.onRemoveCard} />)
          }
        </ul>
      </div>
    );
  }
}
