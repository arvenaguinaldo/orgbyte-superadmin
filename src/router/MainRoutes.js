import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';

// Components / Pages
import Login from 'containers/Login/Login';
import Home from 'containers/Home/Home';
import EventList from 'containers/Events/EventList';
import NotFoundPage from 'containers/NotFound/NotFoundPage';
import OrganizationList from 'containers/OrganizationList/OrganizationList';
import PresidentList from 'containers/PresidentList/PresidentList';
import BackupList from 'containers/BackupList/BackupList';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/events" component={EventList} />
        <Route path="/organizations" component={OrganizationList} />
        <Route path="/presidents" component={PresidentList} />
        <Route path="/backups" component={BackupList} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
