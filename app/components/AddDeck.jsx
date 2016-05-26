import React, { Component } from 'react';

import Actions from '../actions';
import TextInput from './TextInput';

const AddDeck = (props) => {
  let input, deckName = '', deckIndex;
  const isEdit = props.router.route === '/EDIT_DECK';

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.value) {
      return;
    }

    if (isEdit) {
      props.updateDeck(deckIndex, input.value);
    } else {
      props.addDeck(input.value);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.routeRoot();
  };

  const handleRef = (c) => {
    input = c;
    if (input) {
      input.value = deckName;
    }
  };

  if (isEdit) {
    const { decks } = props;
    deckIndex = decks.findIndex(deck => deck.name === props.router.deckName);
    deckName = decks[deckIndex].name;
  }

  return (
    <div>
      <header className="overlay__title">
        <h1>{isEdit ? deckName : 'Новая колода'}</h1>
      </header>

      <form className="form" onSubmit={handleAdd}>
        <div className="form__fields">
          <TextInput caption="Название" onRef={handleRef} />
          <button className="btn btn--alt" type="submit">
            {isEdit ? 'Изменить' : 'Создать'}
          </button>
          <a href="" className="link" onClick={handleCancel}>Отменить</a>
        </div>
      </form>
    </div>
  );
};

export default AddDeck;
