import React, { Component } from 'react';
import { connect } from 'react-redux';

const AddDeck = (props) => {
	return (
		<button className="button--def">
			Добавить
		</button>
	);
}

export default connect()(AddDeck);