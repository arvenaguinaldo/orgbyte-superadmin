import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';
<<<<<<< HEAD
// import PrivateRoute from 'router/routes/PrivateRoute';
=======
import PrivateRoute from 'router/routes/PrivateRoute';
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0

// Components / Pages
import Login from 'containers/Login/Login';
import LoginAdmin from 'containers/LoginAdmin/LoginAdmin';
import Home from 'containers/Home/Home';
import EventList from 'containers/Events/EventList';
import NotFoundPage from 'containers/NotFound/NotFoundPage';
import OrganizationList from 'containers/OrganizationList/OrganizationList';
import PresidentList from 'containers/PresidentList/PresidentList';
import BackupList from 'containers/BackupList/BackupList';
import AddOrganization from 'containers/AddOgranization/AddOrganization';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>

<<<<<<< HEAD
        {/* <PrivateRoute path="/" component={Home} exact />
        <PrivateRoute path="/organizations" component={OrganizationList} />
        <Route path="/login" component={Login} exact />
        <PrivateRoute path="/events" component={EventList} />
        <PrivateRoute path="/backups" component={BackupList} /> */}

        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
=======
        <PrivateRoute path="/" component={Home} exact />
        <PrivateRoute path="/organizations" component={OrganizationList} />
        <PrivateRoute path="/presidents" component={PresidentList} />
        <Route path="/a/login" component={Login} exact />
        <Route path="/login" component={LoginAdmin} exact />
        <PrivateRoute path="/events" component={EventList} />
        <PrivateRoute path="/backups" component={BackupList} />
        <PrivateRoute path="/addorganization" component={AddOrganization} />

        {/* <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/loginadmin" component={AdminLogin} exact />
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
        <Route path="/events" component={EventList} />
        <Route path="/organizations" component={OrganizationList} />
        <Route path="/presidents" component={PresidentList} />
        <Route path="/backups" component={BackupList} />
        <Route path="/addorganization" component={AddOrganization} /> */}
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
