import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from 'router/routes/PrivateRoute';

// Components / Pages
import Login from 'containers/Login/Login';
import LoginAdmin from 'containers/LoginAdmin/LoginAdmin';
import Home from 'containers/Home/Home';
import EventList from 'containers/Events/EventList';
import CreateEvent from 'containers/Events/CreateEvent/CreateEvent';
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
import EventDetails from 'containers/Events/EventDetails/EventDetails';
import EventRegister from 'containers/Events/Register/Register';
import QRScan from 'containers/Events/QRScannerPage/QRScan';
import OrganizationalShirtDetails from 'containers/OrganizationalShirts/OrganizationalShirtDetails/OrganizationalShirtDetails';
import ChangePassword from 'containers/ChangePassword/ChangePassword';
import Announcements from 'containers/Announcements/Announcements';

// User side
import UserAnnouncement from 'containers/UserPage/AnnouncementsPage/Announcement';
import Orgs from 'containers/UserPage/OrganizationsProfilePage/Main';
import UserPage from 'containers/UserPage/Home/HomePage';


class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/a/" component={Home} exact />
        {/* <PrivateRoute path="/" component={Home} exact /> */}
        <Route path="/a/login" component={Login} exact />
        <Route path="/login" component={LoginAdmin} exact />
        <PrivateRoute path="/addorganization" component={AddOrganization} />
        <PrivateRoute path="/organizationalshirt" component={OrganizationalShirtDetails} />
        <Route path="/card" component={MediaCard} />
        <PrivateRoute path="/passwordreset" component={ChangePassword} />
        <PrivateRoute path="/organizations" component={OrganizationList} />
        <PrivateRoute path="/announcements" component={Announcements} />
        <PrivateRoute path="/presidents" component={PresidentList} />
        <PrivateRoute path="/a/events" component={EventList} />
        <PrivateRoute path="/backups" component={BackupList} />

        {/* Admin */}
        <PrivateRoute path="/announcements" component={Announcements} />
        <PrivateRoute path="/addorganization" component={AddOrganization} />
        <PrivateRoute path="/memberships/addmember" component={AddMember} />
        <PrivateRoute path="/memberships" component={Memberships} />
        <PrivateRoute path="/shirts/addorganizationalshirt" component={AddOrganizationalShirt} />
        <PrivateRoute path="/shirts/purchase" component={Purchase} />
        <PrivateRoute path="/shirts" component={OrganizationalShirts} />
        <PrivateRoute path="/events/createevent" component={CreateEvent} />
        <PrivateRoute path="/events/:id/register" component={EventRegister} />
        <PrivateRoute path="/events/:id/qrscanner" component={QRScan} />
        <PrivateRoute path="/events/:id" component={EventDetails} />
        <PrivateRoute path="/events" component={EventList} />
        <PrivateRoute path="/email" component={Email} />
        <PrivateRoute path="/sms" component={SendSMS} />
        <PrivateRoute path="/accounts" component={AddAccount} />
        <PrivateRoute path="/logs" component={UserActivityLogs} />
        <PrivateRoute path="/shirts/addorganizationalshirt" component={AddOrganizationalShirt} />
        <PrivateRoute path="/shirts/purchase" component={Purchase} />
        <PrivateRoute path="/shirts" component={OrganizationalShirts} />

        {/* User Sides */}
        <Route path="/" component={UserPage} exact />
        {/* <Route path="/events" component={Events} exact /> */}
        <Route path="/u/announcement" component={UserAnnouncement} exact />
        <Route path="/orgs" component={Orgs} exact />

        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
