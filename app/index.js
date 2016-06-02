/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { router, decks, player, spa } from './reducers';
import { saveState, loadState } from './utils';
import { DIRTY_ACTIONS } from './constants';
import FlashApp from './components/FlashApp';

const app = combineReducers({
  router,
  decks,
  player,
  spa,
});

const autoSaver = store => next => action => {
  let state = next(action);
  if (DIRTY_ACTIONS.indexOf(action.type) !== -1) {
    saveState(store.getState());
    if (['REMOVE_DECK'].indexOf(action.type) !== -1) {
      state = next({ type: 'SHOW_UNDO' });
    }
  }
  return state;
};

const middleware = [thunk, autoSaver];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger());
}

const persistedState = loadState();
const store = createStore(
  app,
  persistedState,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <FlashApp />
  </Provider>,
  document.getElementById('app')
);
