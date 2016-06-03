import React, { Component } from 'react';

import CardItem from './CardItem';

export default class BrowseCards extends Component {

  constructor(props) {
    super(props);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
  }

  getDeck() {
    const { router, decks } = this.props;
    return decks.find(deck => deck.id === router.deckId);
  }

  handleRemoveCard(cardId) {
    const deck = this.getDeck();
    this.props.removeCard(deck.id, cardId);
  }

  render() {
    const deck = this.getDeck();

    return (
      <div>
        <header className="overlay__title">
          <h1>{deck.name}</h1>
        </header>
        <ul>
          {
            deck.cards.map((card, i) =>
              <CardItem {...card} key={i} onRemove={this.handleRemoveCard} />)
          }
        </ul>
      </div>
    );
  }
}

BrowseCards.propTypes = {
  router: React.PropTypes.object,
  decks: React.PropTypes.array,
  removeCard: React.PropTypes.func,
};
