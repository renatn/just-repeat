/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

require('es6-promise').polyfill();

const store = configureStore();
const rootEl = document.getElementById('app');

const render = () => {
  const App = require('./components/FlashApp').default
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  )
};

if (module.hot) {
  module.hot.accept('./components/FlashApp', () => {
    setTimeout(render);
  });
}

render();

const Worker = require('worker!./worker');
const worker = new Worker('assets/worker.js');
worker.postMessage('GET_DECKS');
worker.onmessage = (e) => {
  console.log(e.data);
};
