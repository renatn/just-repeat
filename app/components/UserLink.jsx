import React from 'react';

const UserLink = ({ userName, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <span>
      <span className="app-bar__username">{userName}</span> 
      <a href="" className="link link--signOut" title="Выход" onClick={handleClick}>&#10162;</a>
    </span>
  );
};

UserLink.propTypes = {
  userName: React.PropTypes.string,
  onClick: React.PropTypes.func,   
};

export default UserLink;