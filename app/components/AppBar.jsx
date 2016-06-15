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


const AppBar = ({ user, userSignIn, userSignOut }) => {
  const link = user.isAuthenticated
                ? <UserLink userName={user.userName} onClick={userSignOut} />
                : <FacebookLink onClick={userSignIn} />;
  return (
    <div className="app-bar__signin">
      <div className="container">
        {link}
      </div>
    </div>
  );
  // &#9776; humburger
};

AppBar.propTypes = {
  user: React.PropTypes.object,
  userSignIn: React.PropTypes.func,
  userSignOut: React.PropTypes.func,
};

export default AppBar;
