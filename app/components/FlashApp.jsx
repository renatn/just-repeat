import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';

import Actions from '../actions';
import Player from './Player';
import AddCard from './AddCard';
import BrowseCards from './BrowseCards';
import AddDeck from './AddDeck';
import DeckGrid from './DeckGrid';

import { initFirebase, signIn, signOut, loadFromFirebase } from '../utils/firebase-client';

const renderScene = (route, props) => {
  switch (route) {
    case '/STUDY':
      return <Player {...props} />;
    case '/ADD_CARD':
      return <AddCard {...props} />;
    case '/BROWSE':
      return <BrowseCards {...props} />;
    case '/ADD_DECK':
      return <AddDeck {...props} />;
    case '/EDIT_DECK':
      return <AddDeck {...props} />;
    default:
      return null;
  }
};

const FacebookLink = () => {
  const handleClick = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <a href="" className="link link--facebook" onClick={handleClick}>
      <span className="facebook-logo"></span>
      Войти
    </a>
  );
};

const UserLink = ({ userName }) => {
  const handleClick = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <span>
      <span className="app-bar__username">{userName}</span> 
      <a href="" className="link link--signOut" title="Выход" onClick={handleClick}>&#10162;</a>
    </span>
  );
};

const AppBar = (props) => {
  const { user } = props;
  const link = user.isAuthenticated 
                ? <UserLink userName={user.userName} />
                : <FacebookLink />
  return (
    <div className="app-bar__signin">
      <div className="container">
        {link}            
      </div>
    </div>
  );
  // &#9776; humburger
};

const Disclaimer = ({ isVisible, onClose }) => {
  return (
    <div className={classnames({ disclaimer: true, 'disclaimer--open': isVisible })}>
      <a href="" className="disclaimer__close" onClick={onClose}>&times;</a>
      <p className="container">
        Приложение работает полностью оффлайн, все введённые данные
        сохраняются только в вашем браузере. Если вы хотите, чтобы данные 
        синхронизировались между устройствами - войдите с помощью Facebook.
      </p>
    </div>
  );
};

const Landing = ({ isVisible, onClick }) => {
  return (
    <div className={classnames({ hidden: isVisible, container: true })}>
      <div className="app-header__description">
        <p>
          Интервальные повторения — техника удержания в памяти,
          заключающаяся в повторении запомненного учебного
          материала по определённым, постоянно возрастающим интервалам
        </p>
      </div>

      <div className="call-to-action">
        <button
          className="btn btn--accent"
          onClick={onClick}
        >
          Добавить колоду
        </button>
      </div>
    </div>    
  );
};

const UndoBar = ({ isVisible, onUndo, onClose }) => {
  return (
    <div className={classnames({ undo: true, 'undo--open': isVisible })}>
      <div className="container">
        <button className="btn btn--base" onClick={onUndo}>
          Отменить
        </button>
        <a href="" className="link" onClick={onClose}>
          Закрыть
        </a>
      </div>
    </div>
  );
};

class AppShell extends Component {

  constructor(props) {
    super(props);

    this.handleCloseUndo = this.handleCloseUndo.bind(this);
    this.handleCloseDisclaimer = this.handleCloseDisclaimer.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    initFirebase(user => {
      if (user) {
        this.props.userAuthenticated(user);
        loadFromFirebase(user.uid).then((snapshot) => {
          this.props.receiveDecks(snapshot.val().decks);
        });
      } else {
        this.props.userNotAuthenticated();
      }
    });
  }

  handleCloseDisclaimer(e) {
    e.preventDefault();
    this.props.hideDisclaimer();
  }

  handleCloseUndo(e) {
    e.preventDefault();
    this.props.closeUndo();
  }

  handleSignIn(e) {
    e.preventDefault();
    signIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signOut();
  }

  render() {
    const { decks, router, settings } = this.props;
    const isOverlayOpen = router.route !== '/';
    const isDisclaimerOpen = settings.isDisclaimerOpen;

    return (
      <div className="root">
        <Disclaimer 
          isVisible={isDisclaimerOpen} 
          onClose={this.handleCloseDisclaimer} 
        />

        <AppBar {...this.props} />

        <header className="app-header">
          <h1 className="app-header__title">Just Repeat!</h1>      
        </header>

        <Landing 
          isVisible={decks.allIds.length > 0} 
          onClick={this.props.routeAddDeck}
        />

        <main className="main">
          <div className="main__content">
            <DeckGrid {...this.props} />
          </div>
        </main>

        <div className={classnames({ overlay: true, 'overlay--open': isOverlayOpen })}>
          <button
            className="overlay__button-close"
            onClick={this.props.routeRoot}
          >
          </button>
          <div className="overlay__content">
            {renderScene(router.route, this.props)}
          </div>
        </div>
      
        <UndoBar 
          isVisible={settings.showUndo}
          onClose={this.handleCloseUndo}
          onUndo={this.props.undo}
        />

      </div>
    );
  }
}

AppShell.propTypes = {
  user: React.PropTypes.object,
  decks: React.PropTypes.object,
  router: React.PropTypes.object,
  settings: React.PropTypes.object,
  undo: React.PropTypes.func,
  closeUndo: React.PropTypes.func,
  hideDisclaimer: React.PropTypes.func,
  routeRoot: React.PropTypes.func,
  routeAddDeck: React.PropTypes.func,
};

export default connect(
  state => ({
    decks: state.decks,
    router: state.router,
    player: state.player,
    settings: state.settings,
    user: state.user,
  }),
  dispatch => bindActionCreators(Actions, dispatch)
)(AppShell);
