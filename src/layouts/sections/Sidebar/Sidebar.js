import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {Link, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashBoardIcon from '@material-ui/icons/Dashboard';
import ManageIcon from '@material-ui/icons/Person';
import AdvanceIcon from '@material-ui/icons/Settings';
import BackupIcon from '@material-ui/icons/Backup';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import style from './Sidebar.scss';

const drawerWidth = 250;

const Styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: '#5E1619'
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  nested: {
    paddingLeft: '50px'
  }
});

class Sidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    advancedMenuOpen: false,
    accountsMenuOpen: false
  };

  handleClickAdvanced = () => {
    this.setState(state => ({advancedMenuOpen: !state.advancedMenuOpen}));
  };
  handleClickAccounts = () => {
    this.setState(state => ({accountsMenuOpen: !state.accountsMenuOpen}));
  };

  render() {
    const {
      classes,
      location: {pathname}
    } = this.props;

    const {
      advancedMenuOpen,
      accountsMenuOpen
    } = this.state;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />

        <MenuList
          subheader={<ListSubheader className={style.subHeader} component="div">Administration</ListSubheader>}
        >
          <MenuItem component={Link} to="/events" selected={pathname === '/events'}>
            <ListItemIcon>
              <DashBoardIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Dashboard</Typography>} />
          </MenuItem>

          <MenuItem button onClick={this.handleClickAccounts} selected={pathname === '/organizations' || pathname === '/presidents'} >
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Manage Accounts</Typography>} />
            {accountsMenuOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={accountsMenuOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/organizations" selected={pathname === '/organizations'} className={classes.nested}>
                <ListItemIcon>
                  <BackupIcon className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Organizations List</Typography>} />
              </MenuItem>

              <MenuItem component={Link} to="/presidents" selected={pathname === '/presidents'} className={classes.nested}>
                <ListItemIcon>
                  <SupervisorAccount className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Presidents List</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>

          <MenuItem button onClick={this.handleClickAdvanced} selected={pathname === '/backup'} >
            <ListItemIcon>
              <AdvanceIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography variant="subheading" className={style.list}>Advanced</Typography>} />
            {advancedMenuOpen ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedMenuOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/backup" selected={pathname === '/backup'} className={classes.nested}>
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
          <MenuItem>
            <ListItemIcon>
              <LogoutIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Logout</Typography>} />
          </MenuItem>
        </MenuList>
      </Drawer>
    );
  }
}

export default compose(
  withRouter,
  withStyles(Styles, {withTheme: true})
)(Sidebar);

