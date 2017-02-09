import React from 'react';
import { connect } from 'react-redux';

import Winner from '../components/Winner';
import Vote from '../components/Vote';
import * as actionCreators from '../actions/actionCreators';

export class Voting extends React.PureComponent {
  render() {
    return (<div>
      {this.props.winner ?
        <Winner
          winnerRef={n => { this.winner = n; }}
          winner={this.props.winner}
        /> :
        <Vote {...this.props} />}
    </div>);
  }
}

Voting.propTypes = {
  winner: React.PropTypes.shape(({ winner: React.PropTypes.string.isRequired })).isRequired,
};

function mapStateToProps(state) {
  console.log(state.$$store.toString());
  return {
    pair: state.$$store.get('$$pair'),
    hasChosen: state.$$store.get('hasChosen'),
    winner: state.$$store.get('winner'),
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators,
)(Voting);
