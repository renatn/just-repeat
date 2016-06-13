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
      isMenuVisible: false,
    };
  }

  handleStudy = () => this.props.study(this.props.deck.id);

  handleAddCard = (e) => {
    e.preventDefault();
    this.props.routeAddCard(this.props.deck.id);
  };

  handleRemove = () => this.props.removeDeck(this.props.deck.id);

  handleBrowse = (e) => {
    e.preventDefault();
    this.props.browse(this.props.deck.id);
  };

  handleMenuToggle = (e) => {
    e.preventDefault();
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  };

  handleEditDeck = (e) => {
    e.preventDefault();
    this.props.routeEditDeck(this.props.deck.id);
  };

  render() {
    const { deck } = this.props;
    const cards = deck.cards || [];

    return (
      <li className="deck" style={{ backgroundColor: deck.color || '#e45a84' }}>
        <div className="deck__top">
          <a href="" title="Редактировать" className="deck__edit-btn" onClick={this.handleEditDeck}>
            &#9881;
          </a>
          <div className="deck__name">
            {deck.name}
          </div>
          <div>
            <a href="" className="deck__count" onClick={this.handleBrowse}>
              {cards.length} {plural(cards.length)}
            </a>
          </div>
        </div>
        <div
          className={classnames({
            deck__actions: true,
            'deck__actions--ext': this.state.isMenuVisible })}
        >

          <div className="main-actions">
            <button 
              className="btn btn--alt" 
              onClick={this.handleStudy} 
              disabled={cards.length === 0}
            >
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
  toggleDeckMenu: React.PropTypes.func,
};
