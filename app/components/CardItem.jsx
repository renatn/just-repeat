import React from 'react';

const formatDate = (ms) => {
	const d = new Date(ms);
	return d.toString();
}

const CardItem = ({ front, back, nextTime, onRemove }) => {
  const handleRemove = () => onRemove(front);
  return (
    <li>
      {front} - {back}, nextTime: {formatDate(nextTime)} &nbsp; <button onClick={handleRemove}>&times;</button>
    </li>
  );
};

CardItem.propTypes = {
  front: React.PropTypes.string,
  back: React.PropTypes.string,
  onRemove: React.PropTypes.func,
};

export default CardItem;
