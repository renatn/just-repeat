import React from 'react';
import UserLink from './UserLink';
import FacebookLink from './FacebookLink';

const AppBar = ({ user, userSignIn, userSignOut }) => {
  const link = user.isAuthenticated
                ? <UserLink userName={user.userName} onClick={userSignOut} />
                : <FacebookLink onClick={userSignIn} />;
  return (
    <div className="app-bar-wrap">
      <div className="app-bar container">
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
