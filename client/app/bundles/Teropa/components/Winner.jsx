import React from 'react';
import BaseComponent from '../../../libs/components/BaseComponent';

export default class Winner extends BaseComponent {
  render() {
    return <div className="winner">
      Winner is {this.props.winner}!
    </div>;
  }
}
