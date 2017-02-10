import React, { Component } from 'react';
import Moment from 'moment';

class ChatRoom extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {			
			message: '',
			messages: []
		}
		this.updateMessage = this.updateMessage.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
	}

	componentDidMount() {		
		console.log("Time is", Moment(new Date()).fromNow());
		firebase.database().ref('messages/').on('value', (snapshot) => {
			const currentMessages = snapshot.val();
			if (currentMessages !== null) {
				this.setState({messages: currentMessages});
			}
		});
	}

	updateMessage(event) {
		this.setState({message: event.target.value})
	}

	submitMessage(event) {
		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message,
			startedAt: firebase.database.ServerValue.TIMESTAMP
		}
		firebase.database().ref('messages/' + nextMessage.id).set(nextMessage);
		this.setState({message: ''});
	}

	render() {
		const currentMessage = this.state.messages.map(function(message, i) {
			let momentTime = Moment(message.startedAt).fromNow(firebase.database.ServerValue.TIMESTAMP)
			console.log("message time", momentTime)
			return (
				<li key={message.id}>{message.text} <small>{momentTime}</small></li>
			)
		})
		return (
			<div>
				<ol className="message-list white-text">
					{currentMessage}
				</ol>
				<input 
					onChange={this.updateMessage} 
					className="usertext" 
					type="text" 
					value={this.state.message ? this.state.message : ''} 
					placeholder="type your message here"/>
				<button 
					onClick={this.submitMessage}
					type="submit"
					className="btn waves-effect waves-light red">
						Submit Message
				</button>
			</div>
		)
	}
}

export default ChatRoom;