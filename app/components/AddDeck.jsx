import React, { Component } from 'react';

import Actions from '../actions';
import TextInput from './TextInput';

const AddDeck = (props) => {
  let input;
  const handleAdd = () => props.addDeck(input.value);
  const handleCancel = (e) => {
    e.preventDefault();
    props.routeRoot();
  }

  return (
    <div className="form">
      <div className="form__title">
        <h1>Новая колода</h1>
      </div>
      <div className="form__fields">
        <TextInput caption="Название" onRef={(c) => input = c} onEnter={handleAdd} />
        <button className="btn btn--alt" onClick={handleAdd}>
          Создать
        </button>
        <a href="" className="link" onClick={handleCancel}>Отменить</a>
      </div>
    </div>
  );
}

export default AddDeck;