import React, { Component } from 'react';

import Actions from '../actions';
import TextInput from './TextInput';

class AddCard extends Component {

  constructor(props) {
    super(props);
    this.inputFront = null,
    this.inputBack = null;

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    this.props.addCard(this.props.router.deck, this.inputFront.value, this.inputBack.value)
    this.inputFront.value = '';
    this.inputBack.value = '';
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.routeRoot();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleAdd}>
        <div className="form__title">
          <h1>{this.props.router.deck} : Новая карточка</h1>
        </div>
        <div className="form__fields">
          <TextInput caption="Вопрос" onRef={(c) => this.inputFront = c} />
          <TextInput caption="Ответ" onRef={(c) => this.inputBack = c} />
          <button type="submit" className="btn btn--alt">
            Добавить
          </button>
          <a href="" className="link" onClick={this.handleCancel}>Отменить</a>
        </div>
      </form>    
    );
  }
}

export default AddCard; 
