import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/common/Spinner/Spinner';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    loading: false
  };

  render() {
    const styles = require('./Button.scss');
    const {
      children,
      disabled,
      loading,
      ...other
    } = this.props;

    const className = classnames(
      styles.root,
      loading && styles.loading,
      disabled && styles.disabled
    );
    const rootProps = {
      ...other,
      className,
      disabled: disabled || loading
    };

    return (
      <button {...rootProps}>
        <div className={styles.wrapper}>
          <div className={styles.overlay}>
            <div className={classnames(styles.spinner, loading && styles.fadeIn)}>
              {loading && <Spinner color="white" />}
            </div>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </button>
    );
  }
}
