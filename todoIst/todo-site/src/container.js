import { connect } from 'react-redux'
import * as components from './components'
import { addTodo, toggleTodo, retrieveTodos } from './actions'

export const TodoPage = connect(
  function mapStateToProps(state) {
    return {state: state}
  },
  function mapDispatchToProps(dispatch) {
    return {
      addTodo: text => dispatch(addTodo(text)),
      toggleTodo: id => dispatch(toggleTodo(id)),
      retrieveTodos: () => dispatch(retrieveTodos())
    }
  }
)(components.TodoPage)
