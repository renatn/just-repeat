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
		this.props.dispatch(
			Actions.addCard(this.inputFront.value, this.inputBack.value)
		);		
		this.inputFront.value = '';
		this.inputBack.value = '';
	}

	render() {
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
			</div>		
		);
	}
}

export default connect()(AddCard);