/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { router, decks, player, spa } from './reducers';
import FlashApp from './components/FlashApp';

/*
TODO:
  - Экран обучения - цвет карточки
  - Обучения - даты
  - Undo - удаления
  - Экран просмотра/редактирования карточек
  - переименование
  - Валидация полей формы
  - Сменить цвет кнопка при Hover (DONE)
  - Дизайн колод - без круглых углов (MD?) (DONE)
  - Экран overlay - max-width 960px (DONE)
*/

const app = combineReducers({
  router,
  decks,
  player,
  spa,
});

const autoSaver = store => next => action => {
  const DIRTY_ACTIONS = ['ADD_DECK', 'UPDATE_DECK', 'ADD_CARD', 'REMOVE_DECK', 'DIFFICULTY_LEVEL'];
  let state = next(action);
  if (DIRTY_ACTIONS.indexOf(action.type) !== -1) {
    const { decks } = store.getState();
    const prev = localStorage.getItem('react-flashcards-v1');
    localStorage.setItem('react-flashcards-v1.bak', prev);
    localStorage.setItem('react-flashcards-v1', JSON.stringify(decks));
    console.info(`Saved ${decks.length} decks`);

    if (['REMOVE_DECK'].indexOf(action.type) !== -1) {
      state = next({ type: 'SHOW_UNDO' });
    }
  }
  return state;
};

const store = createStore(
  app,
  applyMiddleware(thunk, autoSaver, logger())
);

ReactDOM.render(
  <Provider store={store}>
    <FlashApp />
  </Provider>,
  document.getElementById('app')
);
