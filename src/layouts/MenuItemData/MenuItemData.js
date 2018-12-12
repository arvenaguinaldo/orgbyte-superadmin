import React, {Component} from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// Super Admin Icons
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import DashBoardIcon from '@material-ui/icons/Dashboard';
import ManageIcon from '@material-ui/icons/Person';
import AdvanceIcon from '@material-ui/icons/Settings';
import BackupIcon from '@material-ui/icons/Backup';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import AddIcon from '@material-ui/icons/AddCircle';
import People from '@material-ui/icons/People';
import Update from '@material-ui/icons/Update';
import LogsIcon from '@material-ui/icons/History';
import LocationCity from '@material-ui/icons/LocationCity';
import School from '@material-ui/icons/School';

// Admin Icons
import Info from '@material-ui/icons/Info';
import Mail from '@material-ui/icons/Mail';
import SMS from '@material-ui/icons/Sms';
import Add from '@material-ui/icons/Add';
import Lock from '@material-ui/icons/Lock';
import Shop from '@material-ui/icons/ShoppingBasket';
import Building from '@material-ui/icons/AccountBalance';
import Clock from '@material-ui/icons/AccessTime';
import Event from '@material-ui/icons/Event';
import PersonCheckIn from '@material-ui/icons/HowToReg';
import Report from '@material-ui/icons/Description';
import Announcement from '@material-ui/icons/Announcement';
import Typography from '@material-ui/core/Typography';
import style from './MenuItemData.scss';


class SuperAdminMenuItemData extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  state = {
    advancedMenuOpen: false,
    advancedAccountsOpen: false,
    organizationsAccountsOpen: false,
    reportsAccountsOpen: false
  };

  componentWillMount() {
    const {pathname} = this.props;

    if (pathname === '/superadmin/organizations' || pathname === '/superadmin/addorganization' || pathname === '/superadmin/reneworganization') {
      this.setState(({organizationsAccountsOpen: !this.state.organizationsAccountsOpen}));
    }
    if (pathname === '/superadmin/backups' || pathname === '/superadmin/renewaldate' || pathname === '/superadmin/colleges' || pathname === '/superadmin/courses') {
      this.setState(({advancedMenuOpen: !this.state.advancedMenuOpen}));
    }
    if (pathname === '/superadmin/presidents') {
      this.setState(({advancedAccountsOpen: !this.state.advancedAccountsOpen}));
    }
    if (pathname === '/superadmin/reports/organizations' || pathname === '/superadmin/reports/presidents') {
      this.setState(({reportsAccountsOpen: !this.state.reportsAccountsOpen}));
    }
  }

  handleClickAdvanced = () => {
    this.setState(({advancedMenuOpen: !this.state.advancedMenuOpen}));
  };

  handleClickAccounts = () => {
    this.setState(({advancedAccountsOpen: !this.state.advancedAccountsOpen}));
  };

  handleClickOrganization = () => {
    this.setState(({organizationsAccountsOpen: !this.state.organizationsAccountsOpen}));
  };

  handleClickReports = () => {
    this.setState(({reportsAccountsOpen: !this.state.reportsAccountsOpen}));
  }

  render() {
    const {
      pathname,
      onLogout
    } = this.props;

    const {
      advancedMenuOpen,
      advancedAccountsOpen,
      organizationsAccountsOpen,
      reportsAccountsOpen
    } = this.state;

    return (
      <div>
        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Administration</ListSubheader>}
        >
          <MenuItem component={Link} to="/superadmin/" selected={pathname === '/superadmin/'}>
            <ListItemIcon>
              <DashBoardIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Dashboard</Typography>} />
          </MenuItem>

          <MenuItem button onClick={this.handleClickOrganization}>
            <ListItemIcon>
              <Building className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Organizations</Typography>} />
            {organizationsAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={organizationsAccountsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/superadmin/addorganization" selected={pathname === '/superadmin/addorganization'} className={style.nested}>
                <ListItemIcon>
                  <AddIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Add Organization</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/superadmin/reneworganization" selected={pathname === '/superadmin/reneworganization'} className={style.nested}>
                <ListItemIcon>
                  <Update className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Renew Organization</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/superadmin/organizations" selected={pathname === '/superadmin/organizations'} className={style.nested}>
                <ListItemIcon>
                  <People className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Organizations List</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

          <MenuItem button onClick={this.handleClickAdvanced} selected={pathname === '/superadmin/backups'} >
            <ListItemIcon>
              <AdvanceIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography variant="subtitle1" className={style.list}>Advanced</Typography>} />
            {advancedMenuOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedMenuOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/superadmin/colleges" selected={pathname === '/superadmin/colleges'} className={style.nested}>
                <ListItemIcon>
                  <LocationCity className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Colleges</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/superadmin/courses" selected={pathname === '/superadmin/courses'} className={style.nested}>
                <ListItemIcon>
                  <School className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Courses</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/superadmin/renewaldate" selected={pathname === '/superadmin/renewaldate'} className={style.nested}>
                <ListItemIcon>
                  <Clock className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Renewal Period</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/superadmin/backups" selected={pathname === '/superadmin/backups'} className={style.nested}>
                <ListItemIcon>
                  <BackupIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Backup</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>
        </MenuList>

        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Reports</ListSubheader>}
        >
          <MenuItem button onClick={this.handleClickReports} selected={pathname === '/superadmin/reports/organizations' || pathname === '/superadmin/reports/presidents' || pathname === '/superadmin/reports' || pathname === '/superadmin/reports/useractivitylogs'} >
            <ListItemIcon>
              <Report className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Reports</Typography>} />
            {reportsAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={reportsAccountsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem className={style.nested} component={Link} to="/superadmin/reports/organizations" selected={pathname === '/superadmin/reports/organizations'}>
                <ListItemIcon>
                  <Building className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Organizations List</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/superadmin/reports/presidents" selected={pathname === '/superadmin/reports/presidents'}>
                <ListItemIcon>
                  <SupervisorAccount className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Presidents</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/superadmin/reports/useractivitylogs" selected={pathname === '/superadmin/reports/useractivitylogs'}>
                <ListItemIcon>
                  <LogsIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>User logs</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>
        </MenuList>

        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">User</ListSubheader>}
        >

          <MenuItem button onClick={this.handleClickAccounts}>
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Manage Accounts</Typography>} />
            {advancedAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedAccountsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/superadmin/presidents" selected={pathname === '/superadmin/presidents'} className={style.nested}>
                <ListItemIcon>
                  <SupervisorAccount className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Presidents</Typography>} />
              </MenuItem>
              <MenuItem component={Link} to="/superadmin/activitylogs" selected={pathname === '/superadmin/activitylogs'} className={style.nested}>
                <ListItemIcon>
                  <LogsIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>User logs</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>
          <MenuItem button onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Logout</Typography>} />
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

class AdminMenuItemData extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  state = {
    advancedEventsOpen: false,
    advancedShirtsOpen: false,
    advancedAccountsOpen: false,
    advancedReportsOpen: false
  };

  componentWillMount() {
    const {pathname} = this.props;
    if (pathname === '/admin/reports/announcements' || pathname === '/admin/reports/events' || pathname === '/admin/reports/members' || pathname === '/admin/reports/shirts' || pathname === '/admin/reports/attendees' || pathname === '/admin/reports/useractivitylogs' || pathname === '/admin/reports/officers') {
      this.setState(({advancedReportsOpen: !this.state.advancedReportsOpen}));
    }
    if (pathname === '/admin/accounts' || pathname === '/admin/passwordreset' || pathname === '/admin/useractivitylogs') {
      this.setState(({advancedAccountsOpen: !this.state.advancedAccountsOpen}));
    }
    if (pathname === '/admin/events/createevent' || pathname === '/admin/events') {
      this.setState(({advancedEventsOpen: !this.state.advancedEventsOpen}));
    }
    if (pathname === '/admin/shirts' || pathname === '/admin/shirts/addorganizationalshirt') {
      this.setState(({advancedShirtsOpen: !this.state.advancedShirtsOpen}));
    }
  }

  handleClickEvents = () => {
    this.setState(state => ({advancedEventsOpen: !state.advancedEventsOpen}));
  };

  handleClickShirts = () => {
    this.setState(state => ({advancedShirtsOpen: !state.advancedShirtsOpen}));
  };

  handleClickAccounts = () => {
    this.setState(state => ({advancedAccountsOpen: !state.advancedAccountsOpen}));
  };

  handleClickReports = () => {
    this.setState(({advancedReportsOpen: !this.state.advancedReportsOpen}));
  };


  render() {
    const {
      pathname,
      onLogout
    } = this.props;

    const {
      advancedEventsOpen,
      advancedShirtsOpen,
      advancedAccountsOpen,
      advancedReportsOpen
    } = this.state;

    return (
      <div>
        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Administration</ListSubheader>}
        >
          <MenuItem component={Link} to="/admin/" selected={pathname === '/admin/'}>
            <ListItemIcon>
              <DashBoardIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Dashboard</Typography>} />
          </MenuItem>

          <MenuItem component={Link} to="/admin/memberships" selected={pathname === '/admin/memberships'}>
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Membership</Typography>} />
          </MenuItem>

          <MenuItem button onClick={this.handleClickShirts}>
            <ListItemIcon>
              <Shop className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Organizational Shirt</Typography>} />
            {advancedShirtsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedShirtsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/admin/shirts/addorganizationalshirt" selected={pathname === '/admin/shirts/addorganizationalshirt'} className={style.nested}>
                <ListItemIcon>
                  <Add className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Add Shirt</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/admin/shirts" selected={pathname === '/admin/shirts'} className={style.nested}>
                <ListItemIcon>
                  <Shop className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Shirts</Typography>} />
              </MenuItem>
            </MenuList>
          </Collapse>

          <MenuItem button onClick={this.handleClickEvents}>
            <ListItemIcon>
              <Event className={style.listIcon} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography variant="subtitle1" className={style.list}>Event</Typography>} />
            {advancedEventsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedEventsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/admin/events/createevent" selected={pathname === '/admin/events/createevent'} className={style.nested}>
                <ListItemIcon>
                  <Add className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Create Event</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/admin/events" selected={pathname === '/admin/events'} className={style.nested}>
                <ListItemIcon>
                  <Event className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Events</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

        </MenuList>
        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Communication</ListSubheader>}
        >
          <MenuItem component={Link} to="/admin/announcements" selected={pathname === '/admin/announcements'}>
            <ListItemIcon>
              <Info className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Announcements</Typography>} />
          </MenuItem>

          <MenuItem component={Link} to="/admin/email" selected={pathname === '/admin/email'}>
            <ListItemIcon>
              <Mail className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>E-Mail</Typography>} />
          </MenuItem>

          <MenuItem component={Link} to="/admin/sms" selected={pathname === '/admin/sms'}>
            <ListItemIcon>
              <SMS className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>SMS</Typography>} />
          </MenuItem>
        </MenuList>

        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Reports</ListSubheader>}
        >
          <MenuItem button onClick={this.handleClickReports} selected={pathname === '/admin/reports/announcements' || pathname === '/admin/reports/events' || pathname === '/admin/reports/members' || pathname === '/admin/reports/shirts' || pathname === '/admin/reports/events' || pathname === '/admin/reports/members' || pathname === '/admin/reports/attendees' || pathname === '/admin/reports/useractivitylogs'} >
            <ListItemIcon>
              <Report className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Organization Reports</Typography>} />
            {advancedReportsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedReportsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem className={style.nested} component={Link} to="/admin/reports/members" selected={pathname === '/admin/reports/members'}>
                <ListItemIcon>
                  <People className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Members</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/admin/reports/announcements" selected={pathname === '/admin/reports/announcements'}>
                <ListItemIcon>
                  <Announcement className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Announcements</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/admin/reports/events" selected={pathname === '/admin/reports/events'}>
                <ListItemIcon>
                  <Event className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Events</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/admin/reports/shirts" selected={pathname === '/admin/reports/shirts'}>
                <ListItemIcon>
                  <Shop className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Shirt Purchase</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/admin/reports/attendees" selected={pathname === '/admin/reports/attendees'}>
                <ListItemIcon>
                  <PersonCheckIn className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Attendees</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/admin/reports/officers" selected={pathname === '/admin/reports/officers'} >
                <ListItemIcon>
                  <ManageIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Accounts</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>
        </MenuList>

        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">User</ListSubheader>}
        >

          <MenuItem button onClick={this.handleClickAccounts} selected={pathname === '/admin/passwordreset' || pathname === '/admin/accounts' || pathname === '/admin/useractivitylogs'} >
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Manage Accounts</Typography>} />
            {advancedAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedAccountsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem className={style.nested} component={Link} to="/admin/useractivitylogs" selected={pathname === '/admin/useractivitylogs'}>
                <ListItemIcon>
                  <LogsIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>User logs</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/admin/passwordreset" selected={pathname === '/admin/passwordreset'}>
                <ListItemIcon>
                  <Lock className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Change Password</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/admin/accounts" selected={pathname === '/admin/accounts'} >
                <ListItemIcon>
                  <ManageIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Accounts</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

          <MenuItem button onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Logout</Typography>} />
          </MenuItem>

        </MenuList>
      </div>
    );
  }
}

export {
  SuperAdminMenuItemData,
  AdminMenuItemData
};
