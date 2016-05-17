import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Actions from '../actions';
import Player from './Player';
import Editor from './Editor';

class FlashApp extends Component {

	componentDidMount() {
 		this.props.onLoad();
	}

	render() {
		const { cards, router } = this.props;
		
		const handleSave = () => {
			localStorage.setItem('react-flashcards', JSON.stringify(cards));
			alert(`Saved: ${cards.length} cards`);
		}
		
		let view;
		switch (router) {
			case 'STUDY':
				view = <Player />;
				break;
			case 'ADD_CARD':
				view = <Editor />;
				break;
			default:
				view = null;
		}

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
								<button disabled={!cards.length || status.isStarted} onClick={this.props.onStudy}>
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
			onStudy: (cards) => dispatch(Actions.route('STUDY')),
			onBrowse: () => dispatch(Actions.route('BROWSE')),
			onAddCard: () => dispatch(Actions.route('ADD_CARD')),
			onCloseOverlay: () => dispatch(Actions.route('START')),

			onLoad: () => dispatch(Actions.load()),
		}
	}
)(FlashApp);