import React from 'react';

const pad0 = val => (val < 10 ? `0${val}` : val);

const formatDate = (ms) => {
  const d = new Date(ms);
  const day = pad0(d.getDate());
  const month = pad0(d.getMonth() + 1);
  const minutes = pad0(d.getMinutes());
  const millisec = pad0(d.getMilliseconds());
  return `${d.getFullYear()}-${month}-${day} ${d.getHours()}:${minutes}:${millisec}`;
};

const CardItem = ({ id, front, back, nextTime, onRemove }) => {
  const handleRemove = () => onRemove(id);
  return (
    <li>
      {front} - {back},
      nextTime: {formatDate(nextTime)}
      &nbsp; <button onClick={handleRemove}>&times;</button>
    </li>
  );
};

CardItem.propTypes = {
  id: React.PropTypes.string,
  nextTime: React.PropTypes.number,
  front: React.PropTypes.string,
  back: React.PropTypes.string,
  onRemove: React.PropTypes.func,
};

export default CardItem;
