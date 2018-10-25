import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import * as authenticate from 'utils/AuthService';

import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createStructuredSelector} from 'reselect';

import {makeSelectCurrentUser} from 'redux/selectors/auth';

class AdminRoute extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired
  };

  render() {
    const {
      component: RouteComponent,
      user,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!authenticate.isUserAuthenticated() || user.user_type_id !== 'admin') {
            authenticate.deauthenticateUser();
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {from: props.location} // eslint-disable-line react/prop-types
                }}
              />
            );
          }
          return <RouteComponent {...props} />;
        }}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser()
});

const withRedux = connect(mapStateToProps, null);

export default compose(
  withRedux,
)(AdminRoute);
