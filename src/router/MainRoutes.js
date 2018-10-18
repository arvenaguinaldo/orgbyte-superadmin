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
import OrganizationalShirts from 'containers/OrganizationalShirts/OrganizationalShirtsPage/OrganizationalShirtPage';
import AddOrganizationalShirt from 'containers/OrganizationalShirts/AddOrganizationalShirt/AddOrganizationalShirt';
import Purchase from 'containers/OrganizationalShirts/Purchase/Purchase';
import Email from 'containers/SendEmail/Email';
import SendSMS from 'containers/SendSMS/SendSMS';
import AddAccount from 'containers/AccountList/AddAccount';
import UserActivityLogs from 'containers/UserActivityLogs/LogsTable';
import MediaCard from 'containers/OrganizationList/ViewModal';
import Announcements from 'containers/Announcements/Announcements';
import EventDetails from 'containers/EventDetails/EventDetails';
import OrganizationalShirtDetails from 'containers/OrganizationalShirts/OrganizationalShirtDetails/OrganizationalShirtDetails';
import ChangePassword from 'containers/ChangePassword/ChangePassword';


class MainRoutes extends Component {
  render() {
    return (
      <Switch>

        <PrivateRoute path="/" component={Home} exact />
        <Route path="/a/login" component={Login} exact />
        <Route path="/login" component={LoginAdmin} exact />
        <Route path="/eventdetails" component={EventDetails} />
        <Route path="/organizationalshirt" component={OrganizationalShirtDetails} />
        <Route path="/card" component={MediaCard} />
        <Route path="/eventdetails" component={EventDetails} />
        <Route path="/passwordreset" component={ChangePassword} />
        <PrivateRoute path="/organizations" component={OrganizationList} />
        <PrivateRoute path="/announcements" component={Announcements} />
        <PrivateRoute path="/presidents" component={PresidentList} />
        <PrivateRoute path="/events" component={EventList} />
        <PrivateRoute path="/backups" component={BackupList} />
        <PrivateRoute path="/addorganization" component={AddOrganization} />
        <PrivateRoute path="/memberships/addmember" component={AddMember} />
        <PrivateRoute path="/memberships" component={Memberships} />
        <PrivateRoute path="/email" component={Email} />
        <PrivateRoute path="/sms" component={SendSMS} />
        <PrivateRoute path="/accounts" component={AddAccount} />
        <PrivateRoute path="/logs" component={UserActivityLogs} />
        <PrivateRoute path="/shirts/addorganizationalshirt" component={AddOrganizationalShirt} />
        <PrivateRoute path="/shirts/purchase" component={Purchase} />
        <PrivateRoute path="/shirts" component={OrganizationalShirts} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
