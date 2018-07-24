import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';

// Components / Pages
sideBarLayout
import Login from 'containers/Login/Login';
develop
import Home from 'containers/Home/Home';
import EventList from 'containers/Events/EventList';
import NotFoundPage from 'containers/NotFound/NotFoundPage';
import OrganizationList from 'containers/OrganizationList/OrganizationList';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
         sideBarLayout
        <Route path="/login" component={Login} exact />
         develop
        <Route path="/events" component={EventList} />
        <Route path="/organizations" component={OrganizationList} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
