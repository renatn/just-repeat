import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardItem from './CardItem';

export default class BrowseCards extends Component {

  render() {
    const { router, decks } = this.props;

    const deck = decks.find(deck => deck.name === router.deck);

    return (
      <div className="form">
        <div className="form__title">
          <h1>{router.deck}</h1>
        </div>
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
