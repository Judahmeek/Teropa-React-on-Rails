import { PropTypes } from 'react';
import BaseComponent from '../../../libs/components/BaseComponent';

export default class Layout extends BaseComponent {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return this.props.children;
  }
}
