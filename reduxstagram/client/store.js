import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import comments from './data/comments';
import posts from './data/posts';

// create an object for mock data
const defaultState = {
	comments, 
	posts
}

// connect to redux dev tools
const enhancers = compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

// create a store
const store = createStore(rootReducer, defaultState, enhancers);

// collect the users browser history and make it available throughout the app
export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
	// function to re-require and swap out the module for us
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	})
}

export default store;
