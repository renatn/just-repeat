import React, { Component } from 'react';
import classnames from 'classnames';

import CardAnswerActions from './CardAnswerActions';

class Player extends Component {

  constructor(props) {
    super(props);

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleDifficult = this.handleDifficult.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleAnswer() {
    const card = this.props.player[0];
    this.props.answer(card.front);
  }

  handleDifficult(level) {
    const card = this.props.player[0];
    this.props.cardLevel(this.props.router.deck, card.front, level);
  }

  handleDone() {
    this.props.studyDone(this.props.router.deck);
  }

  render() {
    const { router, player } = this.props;

    if (player.length === 0) {
      return (
        <div className="study-done">
          <h1>Интервальное повторение завершено!</h1>
          <button className="btn btn--base" onClick={this.handleDone}>
            OK
          </button>
        </div>
      );
    }

    const card = player[0];
    return (
      <div>
        <header className="overlay__title">
          <h1>{router.deck} : Осталось {player.length}</h1>
        </header>
        <div className="flashcard">
          <p className="flashcard__front">
            {card.front}
          </p>
          <p className={classnames({ hidden: !card.isAnswered, flashcard__back: true })}>
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

Player.propTypes = {
  player: React.PropTypes.array,
  router: React.PropTypes.object,
  answer: React.PropTypes.func,
  cardLevel: React.PropTypes.func,
  studyDone: React.PropTypes.func,
};

export default Player;
