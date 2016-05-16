import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import CardItem from './CardItem';

class Editor extends Component {

	constructor(props) {
		super(props);
		this.inputFront = null,
		this.inputBack = null;

		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd() {
		this.props.dispatch(
			Actions.addCard(this.inputFront.value, this.inputBack.value)
		);		
		this.inputFront.value = '';
		this.inputBack.value = '';
	}

	render() {
		const { cards, isShowCards } = this.props;

		return (
			<div>
				<p>
					<label>Front: &nbsp;</label>
					<input ref={(c) => this.inputFront = c} />
				</p>
				<p>
					<label>Back: &nbsp;</label>
					<input ref={(c) => this.inputBack = c} />
				</p>
				<button onClick={this.handleAdd}>
					Add
				</button>
				<ul className={isShowCards ? '' : 'hidden'}>
					{cards.map((card, i) => <CardItem {...card} key={i} onRemove={this.props.onRemoveCard} />  )}
				</ul>
			</div>		
		);
	}
}

export default connect(
	state => {
		return {
			isShowCards: state.editor.isShowCards,
			cards: state.cards
		}
	},
	dispatch => {
		return {
			onRemoveCard: (front) => dispatch({type: 'REMOVE_CARD', front}),
			dispatch
		}
	}
)(Editor);