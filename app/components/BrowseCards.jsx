import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardItem from './CardItem';

export default class BrowseCards extends Component {

  render() {
    const { cards } = this.props;

    return (
      <ul>
        {
          cards.map((card, i) => 
            <CardItem {...card} key={i} onRemove={this.props.onRemoveCard} />)
        }
      </ul>
    );
  }
}
