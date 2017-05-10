import '../css/app.css'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { TodoPage } from './container'

const store = createStore(reducer, applyMiddleware(thunk))  

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <TodoPage />
    </Provider>, 
    document.getElementById('app')
  )
})
