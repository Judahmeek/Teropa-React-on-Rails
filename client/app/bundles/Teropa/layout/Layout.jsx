import React, { PropTypes } from 'react';
import BaseComponent from '../../../libs/components/BaseComponent';

export default class Layout extends BaseComponent {
  
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  
  render() {
    return this.props.children;
  }
};