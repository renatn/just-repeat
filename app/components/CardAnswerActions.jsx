import React from 'react';

const CardAnswerActions = ({ isAnswered, onAnswer, onDifficult }) => {

  const handleEasy = () => onDifficult(3);
  const handleNorm = () => onDifficult(2);
  const handleHard = () => onDifficult(1);

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

export default CardAnswerActions;
