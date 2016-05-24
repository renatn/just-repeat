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
    const card = this.props.player[0];
    this.props.onAnswer(card.front);
  }

	handleDifficult(level) {
		const card = this.props.player[0];
		this.props.onResult(this.props.deckName, card.front, level);
	} 

	render() {
		const { deckName, player } = this.props;
	
		if (player.length === 0) {
			return (
				<div className="study-done">
					<h1>Интервальное повторение завершено!</h1>
					<button className="btn btn--base" onClick={this.props.onStop}>OK</button>
				</div>
			);
		}

    if (player.length === 0) {
      return (
        <div className="study-done">
          <h1>Интервальное повторение завершено!</h1>
          <button className="btn btn--base" onClick={this.props.onStop}>OK</button>
        </div>
      );
    }

		return (
			<div>
				<header className="overlay__title">
					<h1>{deckName}</h1>
				</header>
				<div className="flashcard">
					<p className="flashcard__front">
						{card.front}
					</p>
					<p className={classnames({ hidden: !card.isAnswered, 'flashcard__back': true })}>
						{card.back}
					</p>
				</div>

        <CardAnswerActions
          isAnswered={card.isAnswered}
          onAnswer={this.handleAnswer}
          onDifficult={this.handleDifficult}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    player: state.player,
    deckName: state.router.deck
  }),
  dispatch ({
    onResult: (deckName, front, level) => dispatch(Actions.cardLevel(deckName, front, level)),
    onAnswer: (front) => dispatch(Actions.answer(front)),
    onStop: () => dispatch(Actions.route('/'))
  })
)(Player);

