import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardItem from './CardItem';

class BrowseCards extends Component {

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

export default connect(
	state => {
		return {
			cards: state.cards
		}
	},
	dispatch => {
		return {
			onRemoveCard: (front) => dispatch({type: 'REMOVE_CARD', front}),
		}
	}
)(BrowseCards);