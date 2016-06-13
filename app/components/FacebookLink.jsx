import React from 'react';

const FacebookLink = ({ onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <a href="" className="link link--facebook" onClick={handleClick}>
      <span className="facebook-logo"></span>
      Войти
    </a>
  );
};

FacebookLink.propTypes = {
  onClick: React.PropTypes.func,   
};

export default FacebookLink;