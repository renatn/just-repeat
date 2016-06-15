import React, { Component } from 'react';

import { getDeckById } from '../reducers/decks';
import TextInput from './TextInput';

const DECK_COLORS = ['#e45a84', '#5a74e4', '#EAD82C', '#4fd75f', '#D49045'];

const ColorPickerItem = ({ color, selected, onClick }) => {
  const CLASS_NAME = 'color-picker__item ' + (selected ? 'color-picker__item--selected' : '');
  const handleClick = () => onClick(color);
  return (
    <li className={CLASS_NAME} style={{ backgroundColor: color }} onClick={handleClick}></li>
  );
};

ColorPickerItem.propTypes = {
  color: React.PropTypes.string,
  selected: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

class AddDeck extends Component {

  constructor(props) {
    super(props);

    let selectedColor = DECK_COLORS[0];
    if (props.isEdit) {
      const { decks, router } = props;
      this.deck = getDeckById(decks, router.deckId);
      selectedColor = this.deck.color;
    }

    this.state = {
      selectedColor,
    };
  }

  handleAdd = (e) => {
    e.preventDefault();
    if (!this.input.value) {
      return;
    }

    if (this.props.isEdit) {
      this.props.updateDeck(this.deck.id, this.input.value, this.state.selectedColor);
    } else {
      this.props.addDeck(this.input.value, this.state.selectedColor);
    }
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.routeRoot();
  };

  handleRef = (c) => {
    this.input = c;
    if (c) {
      const name = this.deck && this.deck.name;
      this.input.value = name || '';
    }
  };

  handleSelectColor = (color) => this.setState({ selectedColor: color });

  render() {
    return (
      <div>
        <header className="overlay__title">
          <h1>{this.props.isEdit ? this.deck.name : 'Новая колода'}</h1>
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
              {this.props.isEdit ? 'Изменить' : 'Создать'}
            </button>
            <a href="" className="link" onClick={this.handleCancel}>Отменить</a>
          </div>
        </form>
      </div>
    );
  }
}

AddDeck.propTypes = {
  updateDeck: React.PropTypes.func,
  addDeck: React.PropTypes.func,
  router: React.PropTypes.object,
  routeRoot: React.PropTypes.func,
  isEdit: React.PropTypes.bool,
};

export default AddDeck;
