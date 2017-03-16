import React, { Component } from 'react';

class TweetBox extends Component {
  constructor(props) {
    super(props)
    this.state = {text: ""}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({text: event.target.value})
  }
  render() {
    return (      
      <div className="well clearfix">
        <textarea 
          className="form-control" 
          onChange={this.handleChange}>
        </textarea>
        <br/>
        <span>{140 - this.state.text.length}</span>
        <button 
          className="btn btn-primary pull-right" 
          disabled={this.state.text.length <= 0 ? true : false}>Tweet</button>
      </div>
    );
  }
}

export default TweetBox;
