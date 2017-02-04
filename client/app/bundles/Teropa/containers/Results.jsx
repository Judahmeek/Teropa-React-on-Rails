import React from 'react';
import { connect } from 'react-redux';

import Tally from '../components/Tally'
import Winner from '../components/Winner';
import * as actionCreators from '../actions/actionCreators';

export class Results extends React.PureComponent {
  render() {
    return this.props.winner ?
      <Winner
        winnerRef={n => { this.winner = n; }}
        winner={this.props.winner}
      /> :
      <Tally {...this.props} />;
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
