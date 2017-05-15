import React from 'react'
// import Radium from 'radium'
// import styles from './nav-styles'
import styleable from 'react-styleable'
import css from './nav.css'

const { func, bool } = React.PropTypes

function getPrevStyles(props) {
  return props.hasPrevious ? props.css.prev : props.css.prevHidden
}

function getNextStyles(props) {
  return props.hasNext ? props.css.next : props.css.nextHidden
}

function Nav(props) {
  return (
    <div className={props.css.root}>
      <button className={getPrevStyles(props)} key='prev' onClick={props.onPrevious}>&#10094;</button>
      <button className={getNextStyles(props)} key='next' onClick={props.onNext}>&#10095;</button>
    </div>
  )
}

Nav.propTypes = {
  onPrevious: func.isRequired,
  onNext: func.isRequired,
  hasPrevious: bool,
  hasNext: bool
}

export default styleable(css)(Nav)
// export default Radium(Nav)
