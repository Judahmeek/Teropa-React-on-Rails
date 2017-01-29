import React from 'react';
import BaseComponent from '../../../libs/components/BaseComponent';

export default class Winner extends BaseComponent {
  render() {
    return (<div ref={this.props.winnerRef} className="winner">
      Winner is {this.props.winner}!
    </div>);
  }
}
