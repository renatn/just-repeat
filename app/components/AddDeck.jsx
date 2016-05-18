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
			<h1>Новая колода</h1>
			<div>
				<span className="input">
					<input className="input__field" ref={(c) => input = c} type="text" placeholder="Название"/>
				</span>
			</div>
			<div>
				<button className="btn button--def" onClick={handleAdd}>
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
			onAddDeck: (deck) => {
				dispatch({ type: 'ADD_DECK', deck });
				dispatch(Actions.route('START'));
			},
			onCancel: (e) => {
				e.preventDefault();
			 	dispatch(Actions.route('START'));
			}
		}
	}
)(AddDeck);