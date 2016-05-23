import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import TextInput from './TextInput';

class AddCard extends Component {

	constructor(props) {
		super(props);
		this.inputFront = null,
		this.inputBack = null;

		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd() {
		this.props.onAddCard(this.props.deckName, this.inputFront.value, this.inputBack.value)
		this.inputFront.value = '';
		this.inputBack.value = '';
	}

	render() {
		return (
			<div className="form">
				<div className="form__title">
					<h1>{this.props.deckName} : Новая карточка</h1>
				</div>
				<div className="form__fields">
					<TextInput caption="Вопрос" onRef={(c) => this.inputFront = c} />
					<TextInput caption="Ответ" onRef={(c) => this.inputBack = c} />
					<button className="btn btn--alt" onClick={this.handleAdd}>
						Добавить
					</button>
					<a href="" className="link" onClick={this.props.onCancel}>Отменить</a>
				</div>
			</div>		
		);
	}
}

export default connect(
	state => {
		return {
			deckName: state.router.deck
		};
	},
	dispatch => {
		return {
			onAddCard: (deck, front, back) => {
				dispatch(Actions.addCard(deck, front, back));
				dispatch(Actions.route('/'));
			},
			onCancel: (e) => {
				e.preventDefault();
			 	dispatch(Actions.route('/'));
			}
		}
	}
)(AddCard);