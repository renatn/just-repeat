import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Actions from '../actions';
import Player from './Player';
import AddCard from './Editor';
import BrowseCards from './BrowseCards';

const getViewByRoute = (route) => {
	switch (route) {
		case 'STUDY':
			return <Player />;
		case 'ADD_CARD':
			return <AddCard />;
		case 'BROWSE':
			return <BrowseCards />;
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
		const { cards, router } = this.props;
		
		const handleSave = () => {
			localStorage.setItem('react-flashcards', JSON.stringify(cards));
			alert(`Saved: ${cards.length} cards`);
		}
		
		const view = getViewByRoute(router);
		return (
			<div>
				<div>
					<div className="app-header clearfix">
						<span className="app-header__title">FlashCards</span>
					</div>

					<ul className="deck-list">
						<li className="deck">
							<div className="deck__name">{`English: ${cards.length}`}</div>
							<div className="deck__actions">
								<button disabled={!cards.length || status.isStarted} onClick={this.handleStudy}>
									Study
								</button>
								<button onClick={this.props.onAddCard}>
									Add
								</button>
								<button onClick={this.props.onBrowse}>
									Browse
								</button>
							</div>
						</li>
					</ul>

					<div>
						<button onClick={handleSave}>
							Save
						</button>
					</div>
				</div>
				<div className={classnames({ overlay: true, 'overlay--open': router !== 'START' })}>
					<button className="overlay__button-close" onClick={this.props.onCloseOverlay}>
						X
					</button>
					{view}
				</div>
			</div>
		);
	}
}

export default connect(
	state => {
		return {
			cards: state.cards, 
			router: state.router
		}
	},
	dispatch => {
		return {
			onStudy: (cards) => dispatch(Actions.study(cards)),
			onBrowse: () => dispatch(Actions.route('BROWSE')),
			onAddCard: () => dispatch(Actions.route('ADD_CARD')),
			onCloseOverlay: () => dispatch(Actions.route('START')),

			onLoad: () => dispatch(Actions.load()),
		}
	}
)(FlashApp);