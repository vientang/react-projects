/* eslint-disable no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Images from './components/Images';

class App extends Component {

	render() {
		return (
			<Images />
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
