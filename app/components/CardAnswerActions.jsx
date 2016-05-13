import React from 'react';

const CardAnswerActions = ({ isAnswered, onAnswer, onDifficult }) => {

	const handleEasy = () => onDifficult(3);
	const handleNorm = () => onDifficult(2);
	const handleHard = () => onDifficult(1);

	return (
		<div>
			<button className={isAnswered ? 'hidden' : ''} onClick={onAnswer}>Answer</button>
			<span className={isAnswered ? '' : 'hidden'}>
				<button onClick={handleEasy}>Easy</button>
				<button onClick={handleNorm}>Normal</button>				
				<button onClick={handleHard}>Hard</button>
			</span>
		</div>
	);
};

export default CardAnswerActions;
