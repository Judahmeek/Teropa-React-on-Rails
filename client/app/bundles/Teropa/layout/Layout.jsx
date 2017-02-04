import React, { PropTypes } from 'react';

export default class Layout extends React.PureComponent {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return this.props.children;
  }
}
