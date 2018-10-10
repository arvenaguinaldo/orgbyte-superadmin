import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import * as authenticate from 'utils/AuthService';

class PrivateRoute extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired
  };

  render() {
    const {
      component: RouteComponent,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!authenticate.isUserAuthenticated()) {
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

export default PrivateRoute;
