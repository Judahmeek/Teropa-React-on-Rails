import React from 'react';
import {connect} from 'react-redux';

import BaseComponent from '../../../libs/components/BaseComponent';

import Winner from '../components/Winner';
import Vote from '../components/Vote';
import * as actionCreators from '../actions/actionCreators';

export class Voting extends BaseComponent {
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
};

function mapStateToProps(state) {
  return {
    pair: state.$$store.get('$$pair'),
    hasChosen: state.$$store.get('hasChosen'),
    winner: state.$$store.get('winner')
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);