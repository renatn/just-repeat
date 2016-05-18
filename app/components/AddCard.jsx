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
		this.props.onAddCard(this.props.deck, this.inputFront.value, this.inputBack.value)
		this.inputFront.value = '';
		this.inputBack.value = '';
	}

	render() {
		return (
			<div class="form">
				<div className="form__title">
					<h1>{this.props.deck} : Новая карточка</h1>
				</div>
				<div className="form__fields">
					<TextInput caption="Вопрос" onRef={(c) => this.inputFront = c} />
					<TextInput caption="Ответ" onRef={(c) => this.inputBack = c} />
					<button className="btn btn--alt" onClick={this.handleAdd}>
						Добавить
					</button>
					<a href="" onClick={this.props.onCancel}>Отменить</a>
				</div>
			</div>		
		);
	}
}

export default connect(
	state => {
		return {
			deck: state.deck
		}
	},
	dispatch => {
		return {
			onAddCard: (deck, front, back) => {
				dispatch(Actions.addCard(deck, front, back));
				dispatch(Actions.route('START'));
			},
			onCancel: (e) => {
				e.preventDefault();
			 	dispatch(Actions.route('START'));
			}
		}
	}
)(AddCard);