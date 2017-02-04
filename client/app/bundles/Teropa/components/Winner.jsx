import React from 'react';

export default class Winner extends React.PureComponent {
  render() {
    return (<div ref={this.props.winnerRef} className="winner">
      {`Winner is "${this.props.winner}"!`}
    </div>);
  }
}
