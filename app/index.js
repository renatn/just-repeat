import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { cards, player, router } from './reducers';
import FlashApp from './components/FlashApp';		

const app = combineReducers({
	cards,
	player,
	router
});

ReactDOM.render(
	<Provider store={createStore(app)}>
		<FlashApp />
	</Provider>,
	document.getElementById('app')
);		
