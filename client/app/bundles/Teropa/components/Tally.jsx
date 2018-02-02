import React from 'react';
import { List } from 'immutable';

export default class Tally extends React.PureComponent {
  getPair() {
    return this.props.pair || [];
  }
  render() {
    return (<div className="results">
      <div className="tally nop">
        {this.getPair().map(entry =>
          <div key={entry} className="entry">
            <h1>{entry.get('name')}</h1>
            <div className="voteCount">
              {entry.get('total_votes')}
            </div>
          </div>,
        )}
      </div>
      <div className="management">
        <button
          className="restart"
          onClick={this.props.restart}
        >
          Restart
        </button>
        <button
          className="next"
          onClick={this.props.next}
        >
          Next
        </button>
      </div>
    </div>);
  }
}

Tally.propTypes = {
  pair: React.PropTypes.instanceOf(List).isRequired,
  next: React.PropTypes.func.isRequired,
  restart: React.PropTypes.func.isRequired,
};
