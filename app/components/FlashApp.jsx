import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import Player from './Player';
import Editor from './Editor';

class FlashApp extends Component {

	render() {

		const { cards, status } = this.props;
		
		const handleSave = () => {
			localStorage.setItem('react-flashcards', JSON.stringify(cards));
			alert(`Saved: ${cards.length} cards`);
		}
		
		const view = status.isStarted ? <Player /> : <Editor />;

		return (
			<div>
				<div className="app-header clearfix">
					<span className="app-title">FlashCards</span>
					<ul className="pull-right">
						<li><a href="">Load</a></li>
						<li><a href="">Save</a></li>
					</ul>
				</div>

				<ul className="deck-list">
					<li className="deck">
						<div className="deck__name">{`English: ${cards.length}`}</div>
						<div className="deck__actions">
							<button disabled={!cards.length || status.isStarted} onClick={this.props.onStart}>
								Play
							</button>
							<button onClick={this.props.onAdd}>
								Add
							</button>
							<button onClick={this.props.onToggleCards}>
								View
							</button>
						</div>
					</li>
				</ul>

				{view}	
				<div className={status.isStarted ? 'hidden' : ''}>
					<br />
					<button onClick={this.props.onLoad}>
						Load
					</button>
					<button onClick={handleSave} disabled={!status.dirty}>
						Save
					</button>
				</div>
			</div>
		);
	}
}

export default connect(
	state => {
		return {
			cards: state.cards, 
			status: state.status
		}
	},
	dispatch => {
		return {
			onStart: (cards) => dispatch(Actions.startLearn(cards)),
			onLoad: () => dispatch(Actions.load()),
			onToggleCards: () => dispatch({type: 'TOGGLE_CARDS_VIEW'})
		}
	}
)(FlashApp);