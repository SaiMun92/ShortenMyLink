import React, { Component } from 'react';

class LinkCreate extends Component{
  constructor(props) {    // the set state will re render the whole page and u need to initialise the state before using
    super(props);

    this.state = { error: '' };
  }

  // to write to the MongoDB
  handleSubmit(event) {     // handler for the submit event
    event.preventDefault(); // this line here prevents the page from refreshing

    // this.refs.form.value => pull the value out of the input
    Meteor.call('links.insert', this.refs.link.value, (error) => {
      if (error) {
        this.setState({ error: 'Enter a valid URL suckers '});
      } else {
        this.setState({ error: '' });
        this.refs.link.value = '';
      }
    });        // Meteor.call is to call a method -> calling the links.insert method
  }

  // Meteor.methods({
  //   'links.insert':function(url) {
  //     check(url, Match.Where(url => validUrl.isUri(url)));
  //     const token = Math.random().toString(36).slice(-5);
  //     Links.insert({ url, token, clicks: 0});
  //   }
  // });


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Link To Shorten</label>
          <input ref="link" className="form-control" />
        </div>
        <div className="text-danger">{this.state.error}</div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;
