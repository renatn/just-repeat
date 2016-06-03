import React, { Component } from 'react';

import TextInput from './TextInput';

class AddCard extends Component {

  constructor(props) {
    super(props);
    this.inputFront = null;
    this.inputBack = null;

    const { decks, router } = props;
    this.deck = decks.find(deck => deck.id === router.deckId);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    if (this.inputFront.value && this.inputBack.value) {
      this.props.addCard(this.deck.id, this.inputFront.value, this.inputBack.value);
      this.inputFront.value = '';
      this.inputBack.value = '';
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.routeRoot();
  }

  render() {
    return (
      <div>
        <header className="overlay__title">
          <h1>{this.deck.name} : Новая карточка</h1>
        </header>
        <form className="form" onSubmit={this.handleAdd}>
          <div className="form__fields">
            <TextInput caption="Вопрос" onRef={(c) => this.inputFront = c} />
            <TextInput caption="Ответ" onRef={(c) => this.inputBack = c} />
            <button type="submit" className="btn btn--alt">
              Добавить
            </button>
            <a href="" className="link" onClick={this.handleCancel}>Отменить</a>
          </div>
        </form>
      </div>
    );
  }
}

AddCard.propTypes = {
  routeRoot: React.PropTypes.func,
  addCard: React.PropTypes.func,
  decks: React.PropTypes.array,
  router: React.PropTypes.object,
};

export default AddCard;
