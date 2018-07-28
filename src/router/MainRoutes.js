import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from 'router/routes/PrivateRoute';

// Components / Pages
import Login from 'containers/Login/Login';
import Home from 'containers/Home/Home';
import EventList from 'containers/Events/EventList';
import NotFoundPage from 'containers/NotFound/NotFoundPage';
import OrganizationList from 'containers/OrganizationList/OrganizationList';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <PrivateRoute path="/organizations" component={OrganizationList} />
        <Route path="/login" component={Login} exact />
        <PrivateRoute path="/events" component={EventList} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
