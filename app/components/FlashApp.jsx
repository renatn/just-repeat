import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Actions from '../actions';
import Player from './Player';
import AddCard from './AddCard';
import BrowseCards from './BrowseCards';
import AddDeck from './AddDeck';
import DeckList from './DeckList';

const getViewByRoute = (route) => {
	switch (route) {
		case 'STUDY':
			return <Player />;
		case 'ADD_CARD':
			return <AddCard />;
		case 'BROWSE':
			return <BrowseCards />;
		case 'ADD_DECK':
			return <AddDeck />;
		default:
			return null;
	}
};

class FlashApp extends Component {

	constructor(props) {
		super(props);
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount() {
 		this.props.onLoad();
	}

	handleSave(e) {
		e.preventDefault();
		const { decks } = this.props;
		localStorage.setItem('react-flashcards', JSON.stringify(decks));
		alert(`Saved: ${decks.length} decks`);
	}

	render() {
		const { decks, router } = this.props;
		
		const view = getViewByRoute(router);
		const isOverlayOpen = router !== 'START';
		return (
			<div>
				<header className="app-header">
					<h1 className="app-header__title">FlashCards!</h1>
				</header>
				<main className="main">
					<div className="main__content">
						<p className={classnames({ 'app_header__description': true, hidden: decks.length > 0 })}>
							Интервальные повторения — техника удержания в памяти, заключающаяся в повторении запомненного учебного материала по определённым, постоянно возрастающим интервалам
						</p>

						<DeckList />

						<div className="call-to-action">
							<button className="btn btn--accent" onClick={this.props.onAddDeck}>
								Добавить колоду
							</button>
						</div>
					</div>
				</main>
				<div className={classnames({ overlay: true, 'overlay--open': isOverlayOpen })}>
					<button className="overlay__button-close" onClick={this.props.onCloseOverlay}>
					</button>
					<div className="overlay__content">
						{view}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => {
		return {
			decks: state.decks,
			cards: state.cards, 
			router: state.router
		}
	},
	dispatch => {
		return {
			onStudy: (deck) => dispatch(Actions.startStudy(deck)),
			onBrowse: (cards) => dispatch(Actions.route('BROWSE'), cards),
			onAddCard: (deck) => dispatch(Actions.routeAddCard(deck)),
			onAddDeck: () => dispatch(Actions.route('ADD_DECK')),
			onCloseOverlay: () => dispatch(Actions.route('START')),

			onLoad: () => dispatch(Actions.load()),
		}
	}
)(FlashApp);