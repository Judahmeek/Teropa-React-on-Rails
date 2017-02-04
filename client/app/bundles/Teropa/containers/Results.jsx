// Todo: Refactor into Tally & Winner components with Results component
// as parent (like was done with Vote/Voting/Winner)

import React from 'react';
import { connect } from 'react-redux';

import Winner from '../components/Winner';
import * as actionCreators from '../actions/actionCreators';

export class Results extends React.PureComponent {
  getPair() {
    return this.props.pair || [];
  }
  render() {
    return this.props.winner ?
      <Winner
        winnerRef={n => { this.winner = n; }}
        winner={this.props.winner}
      /> :
      <div className="results">
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
            ref={n => { this.restart = n; }}
            className="restart"
            onClick={this.props.restart}
          >
            Restart
          </button>
          <button
            ref={n => { this.next = n; }}
            className="next"
            onClick={this.props.next}
          >
            Next
          </button>
        </div>
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    pair: state.$$store.get('$$pair'),
    winner: state.$$store.get('winner'),
  };
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators,
)(Results);
