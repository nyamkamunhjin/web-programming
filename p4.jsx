import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Example from './components/example/Example';
import Header from './components/header/Header';
import States from './components/states/States';

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
      <React.Fragment>
        <Header />
        <button onClick={() => this.setPage(!this.state.page)}>
          Switch Page
        </button>

        {this.state.page ? <Example /> : <States />}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Dynamic />, document.getElementById('reactapp'));
