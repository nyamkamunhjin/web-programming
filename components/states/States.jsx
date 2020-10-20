import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      'window.cs142models.statesModel()',
      window.cs142models.statesModel()
    );
    this.state = {
      states: window.cs142models.statesModel(),
      input: '',
      results: [],
    };
  }

  setInput = (event) => {
    this.setState({
      input: event.target.value,
    });
    this.search(event.target.value);
  };

  search = (input) => {
    let results;
    if (input === '' || input === ' ') {
      results = [];
    } else {
      results = this.state.states.filter((state) => {
        return state.match(RegExp(input, 'i'));
      });
      results.sort();
    }

    this.setState({ results });
  };

  render() {
    return (
      <div>
        <h1>States</h1>
        <input type="text" value={this.state.input} onChange={this.setInput} />
        {this.state.results.length !== 0 ? (
          <ul className="states">
            {this.state.results.map((state, index) => (
              <li key={index}>{state}</li>
            ))}
          </ul>
        ) : (
          <p>No results.</p>
        )}
      </div>
    );
  }
}

export default States;
