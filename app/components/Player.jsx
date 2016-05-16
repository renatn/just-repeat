import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import CardAnswerActions from './CardAnswerActions';

class Player extends Component {

	constructor(props) {
		super(props);

		this.handleOK = this.handleOK.bind(this);
		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleDifficult = this.handleDifficult.bind(this);
	}

	handleOK() {
		this.props.dispatch(Actions.stopLearn());
	}

	handleAnswer() {
		const question = this.props.memo[0];
		this.props.dispatch(Actions.answer(question.index)); 
	}

	handleDifficult(level) {
		const question = this.props.memo[0];
		const card = this.props.cards[question.index];

		this.props.dispatch(Actions.cardLevel(card.front, level));
	} 

	render() {
		const { memo, cards } = this.props;
	
		if (memo.length === 0) {
			return (
				<div>
					<h2>Test Passed!</h2>
					<button onClick={this.handleOK}>OK</button>
				</div>
			);
		}

		const question = memo[0];
		const card = cards[question.index];

		return (
			<div>
				<div className="flashcard">
					<p className="flashcard__front">
						{card.front}
					</p>
					<p className={question.isAnswered ? '' : 'hidden'}>
						{card.back}
					</p>
				</div>

				<CardAnswerActions
					isAnswered={question.isAnswered} 
					onAnswer={this.handleAnswer} 
					onDifficult={this.handleDifficult} 
				/>

			</div>
		);	
	}
}

export default connect(
	state => {
		return {
			memo: state.memo,
			cards: state.cards
		}
	}
)(Player);