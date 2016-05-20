import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import TextInput from './TextInput';

const AddDeck = (props) => {

	let input;

	const handleAdd = () => {
		props.onAddDeck(input.value)
	};

	return (
		<div className="form">
			<div className="form__title">
				<h1>Новая колода</h1>
			</div>
			<div className="form__fields">
				<TextInput caption="Название" onRef={(c) => input = c} onEnter={handleAdd} />
				<button className="btn btn--alt" onClick={handleAdd}>
					Создать
				</button>
				<a href="" className="" onClick={props.onCancel}>Отменить</a>
			</div>
		</div>
	);
}

export default connect(
	null,
	dispatch => {
		return {
			onAddDeck: (deck) => dispatch(Actions.addDeck(deck)),
			onCancel: (e) => {
				e.preventDefault();
			 	dispatch(Actions.route('/'));
			}
		}
	}
)(AddDeck);