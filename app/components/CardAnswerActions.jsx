import React from 'react';

const CardAnswerActions = ({ isAnswered, onAnswer, onDifficult }) => {

	const handleEasy = () => onDifficult(3);
	const handleNorm = () => onDifficult(2);
	const handleHard = () => onDifficult(1);

	return (
		<div className="flashcard-actions">
			<button className={isAnswered ? 'hidden' : 'button--def'} onClick={onAnswer}>Answer</button>
			<span className={isAnswered ? '' : 'hidden'}>
				<button className="button--def" onClick={handleEasy}>Easy</button>
				<button className="button--def" onClick={handleNorm}>Normal</button>				
				<button className="button--def" onClick={handleHard}>Hard</button>
			</span>
		</div>
	);
};

export default CardAnswerActions;
