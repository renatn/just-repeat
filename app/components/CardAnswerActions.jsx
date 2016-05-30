import React from 'react';

const CardAnswerActions = ({ isAnswered, onAnswer, onDifficult }) => {
  const handleEasy = () => onDifficult(0);
  const handleNorm = () => onDifficult(1);
  const handleHard = () => onDifficult(2);

  return (
    <div className="flashcard-actions">
      <button className={isAnswered ? 'hidden' : 'btn btn--base'} onClick={onAnswer}>
        Показать ответ
      </button>
      <span className={isAnswered ? '' : 'hidden'}>
        <button className="btn btn--base" onClick={handleEasy}>Легко</button>
        <button className="btn btn--base" onClick={handleNorm}>Нормально</button>
        <button className="btn btn--base" onClick={handleHard}>Тяжело</button>
      </span>
    </div>
  );
};

CardAnswerActions.propTypes = {
  isAnswered: React.PropTypes.bool,
  onAnswer: React.PropTypes.func,
  onDifficult: React.PropTypes.func,
};

export default CardAnswerActions;
