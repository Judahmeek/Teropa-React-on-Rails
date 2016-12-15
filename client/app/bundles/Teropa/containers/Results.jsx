// Todo: Refactor into Tally & Winner components with Results component as parent (like was done with Vote/Voting/Winner)

import React from 'react';
import {connect} from 'react-redux';

import BaseComponent from '../../../libs/components/BaseComponent';

import Winner from '../components/Winner';
import * as actionCreators from '../actions/actionCreators';

export class Results extends BaseComponent {
  getPair() {
    return this.props.pair || [];
  }
  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }
  render() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="tally">
          {this.getPair().map(entry =>
            <div key={entry} className="entry">
              <h1>{entry}</h1>
              <div className="voteCount">
                {this.getVotes(entry)}
              </div>
            </div>
          )}
        </div>
        <div className="management">
          <button ref="restart"
                  onClick={this.props.restart}>
            Restart
          </button>
          <button ref="next"
                   className="next"
                   onClick={this.props.next}>
            Next
          </button>
      </div>
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    pair: state.$$store.getIn(['$$props', 'vote', 'pair']),
    tally: state.$$store.getIn(['$$props', 'vote', 'tally']),
    winner: state.$$store.getIn(['$$props', 'winner'])
  };
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);