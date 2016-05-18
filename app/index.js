import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { player, router, decks, deck } from './reducers';
import FlashApp from './components/FlashApp';		

const app = combineReducers({
	player,
	router,
	decks,
	deck
});

ReactDOM.render(
	<Provider store={createStore(app)}>
		<FlashApp />
	</Provider>,
	document.getElementById('app')
);		
