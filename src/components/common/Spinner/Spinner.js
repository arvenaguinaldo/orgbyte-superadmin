import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Spinner extends PureComponent {
  static propTypes = {
    color: PropTypes.oneOf(['black', 'white'])
  };
  static defaultProps = {
    color: 'black'
  };
  render() {
    const styles = require('./Spinner.scss');
    const {color} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles[color]} />
        </div>
      </div>
    );
  }
}
