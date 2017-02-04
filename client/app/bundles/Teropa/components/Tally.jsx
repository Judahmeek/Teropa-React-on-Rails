import React from 'react';

export default class Tally extends React.PureComponent {
  getPair() {
    return this.props.pair || [];
  }
  render() {
    return (<div className="results">
      <div className="tally">
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