function postComments(state = [], action) {
	switch(action.type) {
		case 'ADD_COMMENT': 		
			return [...state, {
				user: action.author,
				text: action.comment
			}]
		case 'REMOVE_COMMENT':		
			console.log('removing a content');
			console.log(action.index)
			return [
				...state.slice(0, action.index),
				...state.slice(action.index + 1)
			]
		default: 
			return state;
	}
	return state;
}

function comments(state = [], action) {
	if (typeof action.postId !== undefined) {
		return {
			// take current state
			...state,
			// update this post with a new one
			[action.postId]: postComments(state[action.postId], action)
		}
	}
}

export default comments;