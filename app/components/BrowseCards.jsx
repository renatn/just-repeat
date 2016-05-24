import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardItem from './CardItem';

export default class BrowseCards extends Component {

  render() {
    const { router, decks } = this.props;

    const deck = decks.find(deck => deck.name === router.deck);

    return (
      <ul>
        {
          deck.cards.map((card, i) => 
            <CardItem {...card} key={i} onRemove={this.props.onRemoveCard} />)
        }
      </ul>
    );
  }
}
