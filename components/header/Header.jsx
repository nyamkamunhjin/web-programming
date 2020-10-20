import React, { Component } from 'react';

import './Header.css';
/**
 * @author
 * @class Header
 **/

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header">
        <h1>Header</h1>
        <p>Hello from header.</p>
      </div>
    );
  }
}

export default Header;
