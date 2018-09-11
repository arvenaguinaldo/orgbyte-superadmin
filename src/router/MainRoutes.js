import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from 'router/routes/PrivateRoute';

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
import AddMember from 'containers/Membership/AddMember/AddMember';
import Memberships from 'containers/Membership/MembershipPage/MembershipPage';
import Email from 'containers/SendEmail/Email';
import SendSMS from 'containers/SendSMS/SendSMS';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>

        <PrivateRoute path="/" component={Home} exact />
        <Route path="/a/login" component={Login} exact />
        <Route path="/login" component={LoginAdmin} exact />
        <PrivateRoute path="/organizations" component={OrganizationList} />
        <PrivateRoute path="/presidents" component={PresidentList} />
        <PrivateRoute path="/events" component={EventList} />
        <PrivateRoute path="/backups" component={BackupList} />
        <PrivateRoute path="/addorganization" component={AddOrganization} />
        <PrivateRoute path="/memberships/addmember" component={AddMember} />
        <PrivateRoute path="/memberships" component={Memberships} />
        <PrivateRoute path="/email" component={Email} />
        <PrivateRoute path="/sms" component={SendSMS} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
