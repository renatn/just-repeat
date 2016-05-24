import React, { Component } from 'react';

import Actions from '../actions';
import TextInput from './TextInput';

const AddDeck = (props) => {
  let input;
  const handleAdd = (e) => {
    e.preventDefault();
    if (input.value) {
      props.addDeck(input.value);
    }
  }
  const handleCancel = (e) => {
    e.preventDefault();
    props.routeRoot();
  }

  return (
    <form className="form" onSubmit={handleAdd}>
      <div className="form__title">
        <h1>Новая колода</h1>
      </div>
      <div className="form__fields">
        <TextInput caption="Название" onRef={(c) => input = c} />
        <button className="btn btn--alt" type="submit">
          Создать
        </button>
        <a href="" className="link" onClick={handleCancel}>Отменить</a>
      </div>
    </form>
  );
}

export default AddDeck;