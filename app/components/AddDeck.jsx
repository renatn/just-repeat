import React, { Component } from 'react';

import TextInput from './TextInput';

const DECK_COLORS = ['#e45a84', '#4aa0d5', '#f2e676'];

const ColorPickerItem = (props) => {
  const CLASS_NAME = 'color-picker__item ' + (props.selected ? 'color-picker__item--selected' : '');
  const handleClick = () => props.onClick(props.color);
  return (
    <li className={CLASS_NAME} style={{ backgroundColor: props.color }} onClick={handleClick}></li>
  );
};


class AddDeck extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedColor: DECK_COLORS[0],
    };

  }

  handleAdd = (e) => {
    e.preventDefault();
    if (!this.input.value) {
      return;
    }

    const isEdit = this.props.router.route === '/EDIT_DECK';
    if (isEdit) {
      this.props.updateDeck(this.deckIndex, this.input.value, this.props.selectedColor);
    } else {
      this.props.addDeck(this.input.value);
    }
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.routeRoot();
  };

  handleRef = (c) => {
    this.input = c;
    if (c) {
      this.input.value = (this.deckName || '');
    }
  };

  handleSelectColor = (color) => this.setState({ selectedColor: color });

  render() {

    const isEdit = this.props.router.route === '/EDIT_DECK';
    if (isEdit) {
      const { decks } = this.props;
      this.deckIndex = decks.findIndex(deck => deck.name === this.props.router.deckName);
      this.deckName = decks[this.deckIndex].name;
    }

    return (
      <div>
        <header className="overlay__title">
          <h1>{isEdit ? this.deckName : 'Новая колода'}</h1>
        </header>

        <form className="form" onSubmit={this.handleAdd}>
          <div className="form__fields">
            <TextInput caption="Название" onRef={this.handleRef} />
            <div>
              <label className="input__label">Цвет</label>
              <ul className="color-picker">
                {DECK_COLORS.map((color, i) =>
                  <ColorPickerItem
                    key={i}
                    selected={color === this.state.selectedColor}
                    color={color}
                    onClick={this.handleSelectColor}
                  />
                )}
              </ul>
            </div>
            <button className="btn btn--alt" type="submit">
              {isEdit ? 'Изменить' : 'Создать'}
            </button>
            <a href="" className="link" onClick={this.handleCancel}>Отменить</a>
          </div>
        </form>
      </div>
    );
  }
}

AddDeck.propTypes = {
  router: React.PropTypes.object,
  routeRoot: React.PropTypes.func,
};

export default AddDeck;
