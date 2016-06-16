/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

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
