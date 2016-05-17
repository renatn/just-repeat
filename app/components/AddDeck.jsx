import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';

const AddDeck = (props) => {

	let input;

	const handleAdd = () => {
		props.onAddDeck(input.value)
	};

	return (
		<div className="form">
			<span className="input">
				<input className="input__field" ref={(c) => input = c} type="text" placeholder="Название"/>
			</span>
			<button className="button--def" onClick={handleAdd}>
				Добавить
			</button>
		</div>
	);
}

export default connect(
	null,
	dispatch => {
		return {
			onAddDeck: (deck) => {
				dispatch({ type: 'ADD_DECK', deck });
				dispatch(Actions.route('START'));
			}
		}
	}
)(AddDeck);