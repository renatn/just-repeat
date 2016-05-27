import React from 'react';

const CardItem = ({ front, back, onRemove }) => {
  const handleRemove = () => onRemove(front);
  return (
    <li>
      {front} - {back} &nbsp; <button onClick={handleRemove}>&times;</button>
    </li>
  );
};

CardItem.propTypes = {
  front: React.PropTypes.string,
  back: React.PropTypes.string,
  onRemove: React.PropTypes.func,
};

export default CardItem;
