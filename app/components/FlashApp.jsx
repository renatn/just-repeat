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

class Main extends Component {

  constructor(props) {
    super(props);

    this.handleCloseUndo = this.handleCloseUndo.bind(this);
    this.handleCloseDisclaimer = this.handleCloseDisclaimer.bind(this);
  }

  handleCloseDisclaimer(e) {
    e.preventDefault();
    this.props.hideDisclaimer();
  }

  handleCloseUndo(e) {
    e.preventDefault();
    this.props.closeUndo();
  }

  render() {
    const { decks, router, spa } = this.props;
    const isOverlayOpen = router.route !== '/';
    const isDisclaimerOpen = spa.isDisclaimerOpen;

    return (
      <div className="root">
        <div className={classnames({ disclaimer: true, 'disclaimer--open': isDisclaimerOpen })}>
          <p className="container">
            Приложение работает полностью оффлайн, все введённые данные
            сохраняются только в вашем браузере.<br />
            <a href="" className="link" onClick={this.handleCloseDisclaimer}>Спасибо, понятно!</a>
          </p>
        </div>
        <header className="app-header">
          <h1 className="app-header__title">Just Repeat!</h1>

          <div className={classnames({ hidden: decks.length > 0, container: true })}>
            <div className="app_header__description">
              <p>
                Интервальные повторения — техника удержания в памяти,
                заключающаяся в повторении запомненного учебного
                материала по определённым, постоянно возрастающим интервалам
              </p>
            </div>

            <div className="call-to-action">
              <button
                className="btn btn--accent"
                onClick={this.props.routeAddDeck}
              >
                Добавить колоду
              </button>
            </div>
          </div>

        </header>
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
        <div className={classnames({ undo: true, 'undo--open': spa.showUndo })}>
          <div className="container">
            <button className="btn btn--base" onClick={this.props.undo}>
              Отменить
            </button>
            <a href="" className="link" onClick={this.handleCloseUndo}>
              Закрыть
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    decks: state.decks,
    router: state.router,
    player: state.player,
    spa: state.spa,
  }),
  dispatch => bindActionCreators(Actions, dispatch)
)(Main);
