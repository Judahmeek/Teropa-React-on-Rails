import React from 'react';

export default class Winner extends React.PureComponent {
  render() {
    return (<div ref={this.props.winnerRef} className="winner">
      {`Winner is "${this.props.winner}"!!!`}
    </div>);
  }
}

Winner.propTypes = {
  winner: React.PropTypes.shape(({ winner: React.PropTypes.string.isRequired })).isRequired,
  winnerRef: React.PropTypes.func.isRequired,
};
