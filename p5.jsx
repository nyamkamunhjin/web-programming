import { HashRouter, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Example from './components/example/Example';
import Header from './components/header/Header';
import States from './components/states/States';
import './p5.css';
/**
 * @author
 * @function p4
 **/

/**
 * @author
 * @class
 **/

class Dynamic extends Component {
  state = {
    page: false,
  };

  setPage = (page) => {
    this.setState({ page });
  };

  render() {
    return (
      <HashRouter>
        <Header />
        <Link to="/states">States</Link>
        <Link to="/example">Example</Link>
        <Route path="/states" component={States} />
        <Route path="/example" component={Example} />
      </HashRouter>
    );
  }
}

ReactDOM.render(<Dynamic />, document.getElementById('reactapp'));
