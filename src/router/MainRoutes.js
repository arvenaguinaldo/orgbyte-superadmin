import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';
import SuperAdminRoute from 'router/routes/SuperAdminRoute';
import AdminRoute from 'router/routes/AdminRoute';

// Components / Pages
import Login from 'containers/Login/Login';
import LoginAdmin from 'containers/LoginAdmin/LoginAdmin';
// Super Admin Routes
import Dashboard from 'containers/Dashboard/Dashboard';
import AddOrganization from 'containers/AddOgranization/AddOrganization';
import OrganizationList from 'containers/OrganizationList/OrganizationList';
import PresidentList from 'containers/PresidentList/PresidentList';
import BackupList from 'containers/BackupList/BackupList';
import RenewOrganizationList from 'containers/RenewalList/RenewalList';
import RenewOrganization from 'containers/RenewOrganization/RenewOrganization';
import RenewalDate from 'containers/RenewalDate/RenewalDate';
import SuperAdminOrganizationReport from 'containers/SuperAdminReports/OrganizationList';
import SuperAdminPresidentReport from 'containers/SuperAdminReports/PresidentList';
import SuperAdminActivityLogs from 'containers/SuperAdminActivityLogs/SuperAdminActivityLogs';
import SuperAdminActivityLogsReport from 'containers/SuperAdminReports/ActivityLogsList';

// Admin Routes

//  Admin - Membership Routes
import AddMember from 'containers/Membership/AddMember/AddMember';
import Memberships from 'containers/Membership/MembershipPage/MembershipPage';

//  Admin - Organizational Shirts Routes
import AddOrganizationalShirt from 'containers/OrganizationalShirts/AddOrganizationalShirt/AddOrganizationalShirt';
import EditOrganizationalShirt from 'containers/OrganizationalShirts/EditOrganizationalShirt/EditOrganizationalShirt';
import Purchase from 'containers/OrganizationalShirts/Purchase/Purchase';
import OrganizationalShirtDetails from 'containers/OrganizationalShirts/OrganizationalShirtDetails/OrganizationalShirtDetails';
import OrganizationalShirts from 'containers/OrganizationalShirts/OrganizationalShirtsPage/OrganizationalShirtPage';

//  Admin - Events Routes
import GenerateCertificate from 'containers/Events/GenerateCertificate/GenerateCertificate';
import CreateEvent from 'containers/Events/CreateEvent/CreateEvent';
import EventRegister from 'containers/Events/Register/Register';
import QRScan from 'containers/Events/QRScannerPage/QRScan';
import EventDetails from 'containers/Events/EventDetails/EventDetails';
import EventList from 'containers/Events/EventList';
import CheckIn from 'containers/Events/CheckIn/CheckIn';
import EditEvent from 'containers/Events/EditEvent/EditEvent';

import AnnouncementsPage from 'containers/Announcements/AnnouncementsPage/AnnouncementsPage';
import AddAnnouncements from 'containers/Announcements/AddAnnouncements/AddAnnouncements';
import Email from 'containers/SendEmail/Email';
import SendSMS from 'containers/SendSMS/SendSMS';
import ChangePassword from 'containers/ChangePassword/ChangePassword';
import AccountsList from 'containers/AccountList/AccountsList';
import AddAccount from 'containers/AccountList/AddAccount';
import UserActivityLogs from 'containers/UserActivityLogs/LogsTable';
import Forgot from 'containers/ForgotPassword/Main';
import AdminDashboard from 'containers/AdminDashboard/AdminDashboard';

// Reports
import AnnouncementReport from 'containers/AdminReports/AnnouncementList';
import OrganizationReport from 'containers/AdminReports/EventList';
import MembersReport from 'containers/AdminReports/MemberList';
import ShirtsReport from 'containers/AdminReports/ShirtPurchaseList';
import AttendeesReport from 'containers/AdminReports/AttendeeList';
import OfficersReport from 'containers/AdminReports/OfficerList';
import AttendeeListView from 'containers/AdminReports/AttendeeListView';
import ActivityLogsReport from 'containers/AdminActivityLogs/ActivityLogsList';

// User side Routes
import HomePage from 'containers/UserPage/Home/index';
import UserAnnouncementPage from 'containers/UserPage/Announcements/AnnouncementPage/AnnouncementPage';
import UserEventPage from 'containers/UserPage/Events/EventPage/EventView';
import UserAnnouncement from 'containers/UserPage/Announcements/AnnouncementList/AnnouncementList';
import UserEventList from 'containers/UserPage/Events/EventsList/EventsList';
import UserOrganizationList from 'containers/UserPage/Organizations/UserOrganizationList/UserOrganizationList';
import UserOrganizationProfile from 'containers/UserPage/Organizations/OrganizationPage/OrganizationProfile';
import TrySpinner from 'containers/Spinner/Spinner';
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
        <SuperAdminRoute path="/superadmin/reneworganization" component={RenewOrganizationList} />
        <SuperAdminRoute path="/superadmin/organizations" component={OrganizationList} />
        <SuperAdminRoute path="/superadmin/presidents" component={PresidentList} />
        <SuperAdminRoute path="/superadmin/backups" component={BackupList} />
        <SuperAdminRoute path="/superadmin/renewaldate" component={RenewalDate} />
        <SuperAdminRoute path="/superadmin/renew/:id" component={RenewOrganization} />
        <SuperAdminRoute path="/superadmin/reports/organizations" component={SuperAdminOrganizationReport} />
        <SuperAdminRoute path="/superadmin/reports/presidents" component={SuperAdminPresidentReport} />
        <SuperAdminRoute path="/superadmin/reports/useractivitylogs" component={SuperAdminActivityLogsReport} />
        <SuperAdminRoute path="/superadmin/activitylogs" component={SuperAdminActivityLogs} />

        {/* Admin Routes */}

        <Route path="/ForgotPassword" component={Forgot} />

        {/* Admin - Membership Routes */}
        <AdminRoute path="/admin/" component={AdminDashboard} exact />
        <AdminRoute path="/admin/memberships/addmember" component={AddMember} />
        <AdminRoute path="/admin/memberships" component={Memberships} />

        {/* Admin - Organizational Shirts Routes */}
        <AdminRoute path="/admin/shirts/addorganizationalshirt" component={AddOrganizationalShirt} />
        <AdminRoute path="/admin/shirts/editorganizationalshirt" component={EditOrganizationalShirt} />
        <AdminRoute path="/admin/shirts/purchase" component={Purchase} />
        <AdminRoute path="/admin/shirts/organizationalshirt" component={OrganizationalShirtDetails} />
        <AdminRoute path="/admin/shirts" component={OrganizationalShirts} />

        {/* Admin - Events Routes */}
        <AdminRoute path="/admin/events/createevent" component={CreateEvent} />
        <AdminRoute path="/admin/events/:id/generatecertificate" component={GenerateCertificate} />
        <AdminRoute path="/admin/events/:id/checkin" component={CheckIn} exact />
        <AdminRoute path="/admin/events/:id/register" component={EventRegister} />
        <AdminRoute path="/admin/events/:id/qrscanner" component={QRScan} />
        <AdminRoute path="/admin/events/:id/edit" component={EditEvent} />
        <AdminRoute path="/admin/events/:id" component={EventDetails} exact />
        <AdminRoute path="/admin/events" component={EventList} exact />

        <AdminRoute path="/admin/announcements/add" component={AddAnnouncements} />
        <AdminRoute path="/admin/announcements" component={AnnouncementsPage} />
        <AdminRoute path="/admin/email" component={Email} />
        <AdminRoute path="/admin/sms" component={SendSMS} />
        <AdminRoute path="/admin/passwordreset" component={ChangePassword} />
        <AdminRoute path="/admin/accounts/addaccount" component={AddAccount} />
        <AdminRoute path="/admin/accounts" component={AccountsList} />
        <AdminRoute path="/admin/logs" component={UserActivityLogs} />
        <AdminRoute path="/admin/reports/announcements" component={AnnouncementReport} />
        <AdminRoute path="/admin/reports/events" component={OrganizationReport} />
        <AdminRoute path="/admin/reports/members" component={MembersReport} />
        <AdminRoute path="/admin/reports/shirts" component={ShirtsReport} />
        <AdminRoute path="/admin/reports/attendees" component={AttendeesReport} />
        <AdminRoute path="/admin/reports/officers" component={OfficersReport} />
        <AdminRoute path="/admin/reports/:id/attendees" component={AttendeeListView} />
        <AdminRoute path="/admin/useractivitylogs" component={ActivityLogsReport} />

        {/* User Sides */}
        <Route path="/" component={HomePage} exact />
        <Route path="/announcements" component={UserAnnouncement} exact />
        <Route path="/events" component={UserEventList} exact />
        <Route path="/organizations" component={UserOrganizationList} exact />
        <Route path="/announcements/:id" component={UserAnnouncementPage} exact />
        <Route path="/organizations/:acronym" component={UserOrganizationProfile} />
        <Route path="/events/:id" component={UserEventPage} />
        <Route path="/tryspin" component={TrySpinner} />

        <Route path="/NotFound" component={NotFoundPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
