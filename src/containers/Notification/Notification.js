import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectNotification} from 'redux/selectors/notification';
import {clearMessage} from 'redux/actions/notification';

import NotificationAlert from 'components/Notifications/Notification';

class Notification extends Component {
  static propTypes = {
    notification: PropTypes.object
  };

  render() {
    const {notification} = this.props;

    if (!notification.message || !notification.alert) {
      return null;
    }

    return (
      <div>
        <NotificationAlert
          variant={notification.type}
          message={notification.message}
          open
        />
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
