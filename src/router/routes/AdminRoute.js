import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import * as authenticate from 'utils/AuthService';

import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createStructuredSelector} from 'reselect';

import {makeSelectCurrentUser} from 'redux/selectors/auth';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';

class AdminRoute extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    organization: PropTypes.object,
    component: PropTypes.func.isRequired
  };

  static defaultProps = {
    organization: {},
    user: {}
  };

  render() {
    const {
      component: RouteComponent,
      user,
      organization,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!authenticate.isUserAuthenticated() || user.user_type_id !== 'admin' || user.user_type_id !== 'sub_admin') {

            return (
              <Redirect
                to={{
                  pathname: '/NotFound',
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
  user: makeSelectCurrentUser(),
  organization: makeSelectCurrentOrganization()
});

const withRedux = connect(mapStateToProps, null);

export default compose(
  withRedux,
)(AdminRoute);
