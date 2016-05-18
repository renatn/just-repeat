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
		this.handleStudy = this.handleStudy.bind(this);
	}

	componentDidMount() {
 		this.props.onLoad();
	}

	handleStudy() {
		this.props.onStudy(this.props.cards);
	}

	render() {
		const { decks, router } = this.props;

		const handleSave = (e) => {
			e.preventDefault();
			localStorage.setItem('react-flashcards', JSON.stringify(decks));
			alert(`Saved: ${decks.length} decks`);
		}
		
		const view = getViewByRoute(router);
		const isOverlayOpen = router !== 'START';
		return (
			<div>
				<div className={classnames({ main: true, hidden: isOverlayOpen })}>
					<div className="main__content">
						<div className="app-header clearfix">
							<a className="pull-right" href="" onClick={handleSave}>Save</a>
							<span className="app-header__title">FlashCards!</span>
							<p className={classnames({ 'app_header__description': true, hidden: decks.length > 0 })}>
								Интервальные повторения — техника удержания в памяти, заключающаяся в повторении запомненного учебного материала по определённым, постоянно возрастающим интервалам
							</p>
						</div>

						<DeckList />

						<div className="call-to-action">
							<button className="button--def" onClick={this.props.onAddDeck}>
								Добавить колоду
							</button>
						</div>
					</div>
				</div>
				<div className={classnames({ overlay: true, 'overlay--open': isOverlayOpen })}>
					<button className="overlay__button-close" onClick={this.props.onCloseOverlay}>
						X
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