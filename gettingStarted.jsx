import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

import Example from './components/example/Example';
import Header from './components/header/Header';

ReactDOM.render(
  <React.Fragment>
    <Header />
    <Example />
  </React.Fragment>,
  document.getElementById('reactapp')
);
