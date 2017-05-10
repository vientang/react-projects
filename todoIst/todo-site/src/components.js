import React from 'react'

function Todo(props) {
  const { todo } = props  
  return todo.isDone ? <del>{todo.text}</del> : <span>{todo.text}</span>
}

function TodoList(props) {
  const {todos, toggleTodo, addTodo} = props
  const onSubmit = (event) => {
    event.preventDefault()

    const textInput = document.getElementById('todo-input')
    const text = textInput.value
    
    if (text && text.length > 0) {      
      addTodo(text)
    }

    textInput.value = ''
  }

  const toggleClick = id => event => toggleTodo(id)

  return (
    <div className='todo-list-container'>
      <div className='panel panel-default'>
        <div className='panel-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label>Todo Text: </label>
              <input 
                id='todo-input'
                type='text'
                className='todo-input form-control'
                placeholder='Add todo' />
            </div>
            <button type='submit' className='btn btn-default'>Submit</button>
          </form>
        </div>
      </div>
      {(todos.length > 0)
        ? <div className='todo-list list-group'>
            {todos.map(todo => {
              return (
                <a 
                  key={todo.id} 
                  className='todo-list-item list-group-item'
                  onClick={toggleClick(todo.id)} >
                  <Todo todo={todo} />
                </a>
              )
            })}
          </div>
        : <div className='alert alert-info' role='alert'>
            Todo List is empty.
          </div>
      }
    </div>
  )
}

function Layout(props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6 col-lg-offset-3'>
          <div className='page-header'>
            <h1>Todo List <small>Keep it organized</small></h1>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

function ProgressBar(props) {
  const { completed } = props
  const style = {width: completed + '%'}

  return (
    <div className='progress'>
      <div 
        className='progress-bar progress-bar-striped active' 
        role='progressbar'
        aria-valuenow={completed}
        aria-valuemin='0'
        aria-valuemax='100'
        style={style} >
        <span className='sr-only'>{completed}% Complete</span>
      </div>
    </div>
  )
}

export function TodoPage(props) {
  const { state, toggleTodo, addTodo, retrieveTodos } = props
  if (state.error) {
    return (
      <Layout>
        <div
          className='alert alert-danger'
          role='alert'>
          {state.error.toString()}
        </div>
        <input 
          className='retry-button btn btn-default'
          type='button'
          value='Retry'
          onClick={retrieveTodos} />
      </Layout>
    )
  } else if (state.initialized) {
    return (
      <Layout>
        <TodoList 
          todos={state.todos}
          toggleTodo={toggleTodo}
          addTodo={addTodo} />
      </Layout>
    )
  } else {
    retrieveTodos()
    return (
      <Layout>
        <ProgressBar completed='45' />
      </Layout>
    )
  }

}
