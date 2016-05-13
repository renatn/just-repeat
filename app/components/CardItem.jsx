import React from 'react';

const CardItem = ({front, back, onRemove }) => {
	const handleRemove = () => onRemove(front);
	return (
		<li>
			{front} - {back} &nbsp; <button onClick={handleRemove}>X</button>
		</li>
	);
};

export default CardItem;