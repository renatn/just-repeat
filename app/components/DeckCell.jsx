import React, { Component } from 'react';
import classnames from 'classnames';

const plural = (n) => {
  switch (n) {
    case 1:
      return 'карточка';
    case 2:
    case 3:
    case 4:
      return 'карточки';
    default:
      return 'карточек';
  }
};

export default class DeckCell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false
    };
  }

  handleStudy = () => this.props.study(this.props.deck.name);

  handleAddCard = (e) => {
    e.preventDefault();
    this.props.routeAddCard(this.props.deck.name);
  };

  handleRemove = () => this.props.removeDeck(this.props.deck.name);

  handleBrowse = (e) => {
    e.preventDefault();
    this.props.browse(this.props.deck.name);
  };

  handleMenuToggle = (e) => {
    e.preventDefault();
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  };

  handleEditDeck = (e) => {
    e.preventDefault();
    this.props.routeEditDeck(this.props.deck.name);
  };

  render() {
    const { deck } = this.props;

    return (
      <li className="deck">
        <div className="deck__top">
          <a href="" title="Редактировать" className="deck__edit-btn" onClick={this.handleEditDeck}>
            &#9881;
          </a>
          <div className="deck__name">
            {deck.name}
          </div>
          <div>
            <a href="" className="deck__count" onClick={this.handleBrowse}>
              {deck.cards.length} {plural(deck.cards.length)}
            </a>
          </div>
        </div>
        <div
          className={classnames({
            deck__actions: true,
            'deck__actions--ext': this.state.isMenuVisible })}
        >

          <div className="main-actions">
            <button className="btn btn--alt" onClick={this.handleStudy}>
              Учить
            </button>
            <button className="btn btn--alt" onClick={this.handleAddCard}>
              Пополнить
            </button>
          </div>

          <div className="ext-actions">
            <button className="btn btn--more" onClick={this.handleMenuToggle}>
              &#8942;
            </button>
            <div className="ext-actions__content">
              <button className="btn btn--alt" onClick={this.handleRemove}>
                Удалить
              </button>
            </div>
          </div>

        </div>
      </li>
    );
  }
}

DeckCell.propTypes = {
  deck: React.PropTypes.object,
  study: React.PropTypes.func,
  routeAddCard: React.PropTypes.func,
  routeEditDeck: React.PropTypes.func,
  browse: React.PropTypes.func,
  removeDeck: React.PropTypes.func,
  toggleDeckMenu: React.PropTypes.func
};
