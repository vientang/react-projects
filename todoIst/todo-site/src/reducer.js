const init = {
  todos: [],
  error: false
}

export default function(state = init, action) {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return {todos: action.payload, error: false, initialized: true}
    case 'ERROR':
      return {todos: [], error: action.payload, initialized: true}
    default:
      return state
  }
}
