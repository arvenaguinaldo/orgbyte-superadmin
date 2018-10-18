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
import AddIcon from '@material-ui/icons/addcircle';
import People from '@material-ui/icons/people';

// Admin Icons
import Info from '@material-ui/icons/Info';
import Mail from '@material-ui/icons/Mail';
import SMS from '@material-ui/icons/Sms';
import Add from '@material-ui/icons/Add';
import Lock from '@material-ui/icons/Lock';
import Shop from '@material-ui/icons/ShoppingBasket';

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

    if (pathname === '/organizations' || pathname === '/presidents' || pathname === '/addorganization') {
      this.setState(({advancedAccountsOpen: !this.state.advancedAccountsOpen}));
    }

    if (pathname === '/backups') {
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
          <MenuItem component={Link} to="/events" selected={pathname === '/events'}>
            <ListItemIcon>
              <DashBoardIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Dashboard</Typography>} />
          </MenuItem>

          <MenuItem button onClick={this.handleClickAccounts}>
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Manage Accounts</Typography>} />
            {advancedAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedAccountsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/addorganization" selected={pathname === '/addorganization'} className={style.nested}>
                <ListItemIcon>
                  <AddIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Add Organization</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/organizations" selected={pathname === '/organizations'} className={style.nested}>
                <ListItemIcon>
                  <People className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Organizations List</Typography>} />
              </MenuItem>


              <MenuItem component={Link} to="/presidents" selected={pathname === '/presidents'} className={style.nested}>
                <ListItemIcon>
                  <SupervisorAccount className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Presidents</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

          <MenuItem button onClick={this.handleClickAdvanced} selected={pathname === '/backups'} >
            <ListItemIcon>
              <AdvanceIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography variant="subheading" className={style.list}>Advanced</Typography>} />
            {advancedMenuOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedMenuOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/backups" selected={pathname === '/backups'} className={style.nested}>
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
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Logout</Typography>} />
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
          <MenuItem component={Link} to="/memberships" selected={pathname === '/memberships'}>
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Membership</Typography>} />
          </MenuItem>

          <MenuItem button onClick={this.handleClickShirts} component={Link} to="/shirts" selected={pathname === '/shirts'}>
            <ListItemIcon>
              <Shop className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Organizational Shirt</Typography>} />
            {advancedShirtsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedShirtsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/shirts/addorganizationalshirt" selected={pathname === '/shirts/addorganizationalshirt'} className={style.nested}>
                <ListItemIcon>
                  <Add className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Add Shirt</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

          <MenuItem button onClick={this.handleClickEvents} selected={pathname === '/events'} >
            <ListItemIcon>
              <AdvanceIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography variant="subheading" className={style.list}>Event</Typography>} />
            {advancedEventsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedEventsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/backups" selected={pathname === '/backups'} className={style.nested}>
                <ListItemIcon>
                  <Add className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Add Event</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

        </MenuList>
        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Communication</ListSubheader>}
        >
          <MenuItem component={Link} to="/announcements" selected={pathname === '/announcements'}>
            <ListItemIcon>
              <Info className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Announcements</Typography>} />
          </MenuItem>

          <MenuItem component={Link} to="/email" selected={pathname === '/email'}>
            <ListItemIcon>
              <Mail className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>E-Mail</Typography>} />
          </MenuItem>

          <MenuItem component={Link} to="/sms" selected={pathname === '/sms'}>
            <ListItemIcon>
              <SMS className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>SMS</Typography>} />
          </MenuItem>
        </MenuList>

        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">User</ListSubheader>}
        >

          <MenuItem button onClick={this.handleClickAccounts} selected={pathname === '/organizations' || pathname === '/presidents'} >
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Manage Accounts</Typography>} />
            {advancedAccountsOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedAccountsOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem className={style.nested} component={Link} to="/changepassword">
                <ListItemIcon>
                  <Lock className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subheading" className={style.list}>Change Password</Typography>} />
              </MenuItem>

              <MenuItem className={style.nested} component={Link} to="/accounts" selected={pathname === '/accounts'} >
                <ListItemIcon>
                  <ManageIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subheading" className={style.list}>Accounts</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

          <MenuItem button onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Logout</Typography>} />
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
