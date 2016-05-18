import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';

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
			<div>
				<h1>{this.props.deck}</h1>
				<h2>Новая карточка</h2>
				<p>
					<span className="input">
						<input className="input__field" ref={(c) => this.inputFront = c} type="text" placeholder="Вопрос"/>
					</span>
				</p>
				<p>
					<span className="input">
						<input className="input__field" ref={(c) => this.inputBack = c} type="text" placeholder="Ответ"/>
					</span>
				</p>
				<button className="btn button--def" onClick={this.handleAdd}>
					Добавить
				</button>
				<a href="" onClick={this.props.onCancel}>Отменить</a>
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