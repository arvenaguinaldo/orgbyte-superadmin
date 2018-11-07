import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';
import SuperAdminRoute from 'router/routes/SuperAdminRoute';
import AdminRoute from 'router/routes/AdminRoute';

// Components / Pages
import Login from 'containers/Login/Login';
import LoginAdmin from 'containers/LoginAdmin/LoginAdmin';
import Home from 'containers/Home/Home';

// Super Admin Routes
import Dashboard from 'containers/Dashboard/Dashboard';
import AddOrganization from 'containers/AddOgranization/AddOrganization';
import OrganizationList from 'containers/OrganizationList/OrganizationList';
import PresidentList from 'containers/PresidentList/PresidentList';
import BackupList from 'containers/BackupList/BackupList';
import RenewOrganization from 'containers/RenewOrganization/RenewOrganization';

// Admin Routes

//  Admin - Membership Routes
import AddMember from 'containers/Membership/AddMember/AddMember';
import Memberships from 'containers/Membership/MembershipPage/MembershipPage';

//  Admin - Organizational Shirts Routes
import AddOrganizationalShirt from 'containers/OrganizationalShirts/AddOrganizationalShirt/AddOrganizationalShirt';
import Purchase from 'containers/OrganizationalShirts/Purchase/Purchase';
import OrganizationalShirtDetails from 'containers/OrganizationalShirts/OrganizationalShirtDetails/OrganizationalShirtDetails';
import OrganizationalShirts from 'containers/OrganizationalShirts/OrganizationalShirtsPage/OrganizationalShirtPage';

//  Admin - Events Routes
import CreateEvent from 'containers/Events/CreateEvent/CreateEvent';
import EventRegister from 'containers/Events/Register/Register';
import QRScan from 'containers/Events/QRScannerPage/QRScan';
import EventDetails from 'containers/Events/EventDetails/EventDetails';
import EventList from 'containers/Events/EventList';

import AnnouncementsPage from 'containers/Announcements/AnnouncementsPage/AnnouncementsPage';
import AddAnnouncements from 'containers/Announcements/AddAnnouncements/AddAnnouncements';
import Email from 'containers/SendEmail/Email';
import SendSMS from 'containers/SendSMS/SendSMS';
import ChangePassword from 'containers/ChangePassword/ChangePassword';
import AddAccount from 'containers/AccountList/AddAccount';
import UserActivityLogs from 'containers/UserActivityLogs/LogsTable';

// User side Routes
import HomePage from 'containers/UserPage/Home/index';
import AnnounceView from 'containers/UserPage/Announcements/AnnouncementPage/AnnounceView';
import EventView from 'containers/UserPage/Events/EventPage/EventView';
import UserAnnouncement from 'containers/UserPage/Announcements/AnnouncementPage/Announcement';
import UserEventList from 'containers/UserPage/Events/EventsList/EventsList';
import UserOrganizationList from 'containers/UserPage/Organizations/UserOrganizationList/UserOrganizationList';
import UserOrganizationProfile from 'containers/UserPage/Organizations/OrganizationPage/OrganizationProfile';

import NotFoundPage from 'containers/NotFound/NotFoundPage';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>

        <Route path="/superadmin/login" component={Login} exact />
        <Route path="/login" component={LoginAdmin} exact />

        {/* Super Admin Routes */}
        <SuperAdminRoute path="/superadmin/" component={Dashboard} exact />
        <SuperAdminRoute path="/superadmin/addorganization" component={AddOrganization} />
        <SuperAdminRoute path="/superadmin/reneworganization" component={RenewOrganization} />
        <SuperAdminRoute path="/superadmin/organizations" component={OrganizationList} />
        <SuperAdminRoute path="/superadmin/presidents" component={PresidentList} />
        <SuperAdminRoute path="/superadmin/backups" component={BackupList} />

        {/* Admin Routes */}

        {/* Admin - Membership Routes */}
        <AdminRoute path="/admin/" component={Home} exact />
        <AdminRoute path="/admin/memberships/addmember" component={AddMember} />
        <AdminRoute path="/admin/memberships" component={Memberships} />

        {/* Admin - Organizational Shirts Routes */}
        <AdminRoute path="/admin/shirts/addorganizationalshirt" component={AddOrganizationalShirt} />
        <AdminRoute path="/admin/shirts/purchase" component={Purchase} />
        <AdminRoute path="/admin/shirts/organizationalshirt" component={OrganizationalShirtDetails} />
        <AdminRoute path="/admin/shirts" component={OrganizationalShirts} />

        {/* Admin - Events Routes */}
        <AdminRoute path="/admin/events/createevent" component={CreateEvent} />
        <AdminRoute path="/admin/events/:id/register" component={EventRegister} />
        <AdminRoute path="/admin/events/:id/qrscanner" component={QRScan} />
        <AdminRoute path="/admin/events/:id" component={EventDetails} />
        <AdminRoute path="/admin/events" component={EventList} />

        <AdminRoute path="/admin/announcements/add" component={AddAnnouncements} />
        <AdminRoute path="/admin/announcements" component={AnnouncementsPage} />
        <AdminRoute path="/admin/email" component={Email} />
        <AdminRoute path="/admin/sms" component={SendSMS} />
        <AdminRoute path="/admin/passwordreset" component={ChangePassword} />
        <AdminRoute path="/admin/accounts" component={AddAccount} />
        <AdminRoute path="/admin/logs" component={UserActivityLogs} />

        {/* User Sides */}
        <Route path="/" component={HomePage} exact />
        <Route path="/announcements" component={UserAnnouncement} exact />
        <Route path="/events" component={UserEventList} exact />
        <Route path="/organizations" component={UserOrganizationList} exact />
        <Route path="/announceview" component={AnnounceView} exact />
        <Route path="/organizations/:id" component={UserOrganizationProfile} />
        <Route path="/events/:id" component={EventView} />
        <Route path="" component={NotFoundPage} />
        <Route path="/NotFound" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
