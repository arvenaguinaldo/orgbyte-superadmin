import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectNotification} from 'redux/selectors/notification';
import {clearMessage} from 'redux/actions/notification';

class Notification extends Component {
  static propTypes = {
    notification: PropTypes.object,
    clearMessage: PropTypes.func.isRequired
  };

  render() {
    const {notification} = this.props;

    if (!notification.message || !notification.alert) {
      return null;
    }

    return (
      <div>
        <p>{notification.message}</p>
        <div onClick={this.props.clearMessage}>[X]</div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification()
});

const mapDispatchToProps = {
  clearMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
