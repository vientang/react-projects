import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './ChatRoom';

class App extends Component {
	render() {
		return (
			<div className="chat-container red darken-4">
				<h2 className="white-text">Vampire Chats</h2>
				<ChatRoom />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
