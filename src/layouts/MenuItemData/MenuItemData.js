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

// Admin Icons
import Info from '@material-ui/icons/Info';
import Mail from '@material-ui/icons/Mail';
import SMS from '@material-ui/icons/Sms';
import Add from '@material-ui/icons/Add';
import Lock from '@material-ui/icons/Lock';
import Shop from '@material-ui/icons/ShoppingBasket';
import Event from '@material-ui/icons/Event';

import Typography from '@material-ui/core/Typography';
import style from './MenuItemData.scss';


class SuperAdminMenuItemData extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  state = {
    advancedMenuOpen: false,
    advancedAccountsOpen: false
  };

  componentWillMount() {
    const {pathname} = this.props;

    if (pathname === '/superadmin/organizations' || pathname === '/superadmin/presidents' || pathname === '/superadmin/addorganization') {
      this.setState(({advancedAccountsOpen: !this.state.advancedAccountsOpen}));
    }

    if (pathname === '/superadmin/backups') {
      this.setState(({advancedMenuOpen: !this.state.advancedMenuOpen}));
    }
  }

  handleClickAdvanced = () => {
    this.setState(({advancedMenuOpen: !this.state.advancedMenuOpen}));
  };

  handleClickAccounts = () => {
    this.setState(({advancedAccountsOpen: !this.state.advancedAccountsOpen}));
  };

  render() {
    const {
      pathname,
      onLogout
    } = this.props;

    const {
      advancedMenuOpen,
      advancedAccountsOpen
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

          <MenuItem button onClick={this.handleClickAccounts}>
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Manage Accounts</Typography>} />
            {advancedAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedAccountsOpen} timeout="auto" unmountOnExit>
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


              <MenuItem component={Link} to="/superadmin/presidents" selected={pathname === '/superadmin/presidents'} className={style.nested}>
                <ListItemIcon>
                  <SupervisorAccount className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Presidents</Typography>} />
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
          subheader={<ListSubheader className={style.subHeader} component="div">User</ListSubheader>}
        >

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
    advancedAccountsOpen: false
  };

  handleClickEvents = () => {
    this.setState(state => ({advancedEventsOpen: !state.advancedEventsOpen}));
  };

  handleClickShirts = () => {
    this.setState(state => ({advancedShirtsOpen: !state.advancedShirtsOpen}));
  };

  handleClickAccounts = () => {
    this.setState(state => ({advancedAccountsOpen: !state.advancedAccountsOpen}));
  };


  render() {
    const {
      pathname,
      onLogout
    } = this.props;

    const {
      advancedEventsOpen,
      advancedShirtsOpen,
      advancedAccountsOpen
    } = this.state;

    return (
      <div>
        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Administration</ListSubheader>}
        >
          <MenuItem component={Link} to="/admin/memberships" selected={pathname === '/admin/memberships'}>
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Membership</Typography>} />
          </MenuItem>

          <MenuItem button onClick={this.handleClickShirts} component={Link} to="/admin/shirts" selected={pathname === '/admin/shirts'}>
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

            </MenuList>
          </Collapse>

          <MenuItem button onClick={this.handleClickEvents} component={Link} to="/admin/events" selected={pathname === '/admin/events'} >
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

            </MenuList>
          </Collapse>

        </MenuList>
        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Communication</ListSubheader>}
        >
          <MenuItem component={Link} to="/admin/announcementspage" selected={pathname === '/admin/announcementspage'}>
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
          subheader={<ListSubheader className={style.subHeader} component="div">User</ListSubheader>}
        >

          <MenuItem button onClick={this.handleClickAccounts} selected={pathname === '/admin/passwordreset' || pathname === '/admin/accounts'} >
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1" className={style.list}>Manage Accounts</Typography>} />
            {advancedAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedAccountsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

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
