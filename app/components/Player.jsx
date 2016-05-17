import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Actions from '../actions';
import CardAnswerActions from './CardAnswerActions';

class Player extends Component {

	constructor(props) {
		super(props);

		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleDifficult = this.handleDifficult.bind(this);
	}

	handleAnswer() {	
		const question = this.props.player[0];
		this.props.onAnswer(question.index);
	}

	handleDifficult(level) {
		const question = this.props.player[0];
		const card = this.props.cards[question.index];
		this.props.onResult(card.front, level);
	} 

	render() {
		const { cards, player } = this.props;
	
		if (player.length === 0) {
			return (
				<div className="study-done">
					<h2>Test Passed!</h2>
					<button onClick={this.props.onStop}>OK</button>
				</div>
			);
		}

		const question = player[0];
		const card = cards[question.index];

		return (
			<div>
				<div className="flashcard">
					<p className="flashcard__front">
						{card.front}
					</p>
					<p className={classnames({ hidden: !question.isAnswered, 'flashcard__back': true })}>
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
			player: state.player,
			cards: state.cards
		}
	},
	dispatch => {
		return {
			onResult: (front, level) => dispatch(Actions.cardLevel(front, level)),
			onAnswer: (index) => dispatch(Actions.answer(index)),
			onStop: () => dispatch(Actions.route('START'))
		}
	}
)(Player);