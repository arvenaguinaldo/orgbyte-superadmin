import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashBoardIcon from '@material-ui/icons/Dashboard';
import ManageIcon from '@material-ui/icons/Person';
import AdvanceIcon from '@material-ui/icons/Settings';
import BackupIcon from '@material-ui/icons/Backup';
import LogoutIcon from '@material-ui/icons/ExitToApp';


const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: '#5E1619'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  listHeader: {
    fontSize: '10px'
  },
  hide: {
    display: 'none'
  }
});

class Sidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onRequestSidebarClose: PropTypes.func.isRequired
  };

  state = {
    advancedMenuOpen: false
  };

  handleClick = () => {
    this.setState(state => ({advancedMenuOpen: !state.advancedMenuOpen}));
  };

  render() {
    const {
      classes,
      location: {pathname},
      theme,
      open,
      onRequestSidebarClose
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onRequestSidebarClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <MenuList
          subheader={<ListSubheader className={classNames(!open && classes.hide)} component="div">Administration</ListSubheader>}
        >
          <MenuItem component={Link} to="/events" selected={pathname === '/events'}>
            <ListItemIcon>
              <DashBoardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </MenuItem>

          <MenuItem button>
            <ListItemIcon>
              <ManageIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Accounts" />
          </MenuItem>

          <MenuItem button onClick={this.handleClick}>
            <ListItemIcon>
              <AdvanceIcon />
            </ListItemIcon>
            <ListItemText inset primary="Advanced" />
            {this.state.advancedMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={this.state.advancedMenuOpen} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>
              <MenuItem button className={classes.nested}>
                <ListItemIcon>
                  <BackupIcon />
                </ListItemIcon>
                <ListItemText inset primary="Backup" />
              </MenuItem>
            </MenuList>
          </Collapse>
        </MenuList>

        <MenuList
          component="nav"
          subheader={<ListSubheader className={classNames(!open && classes.hide)} component="div">User</ListSubheader>}
        >
          <MenuItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </MenuList>
      </Drawer>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles, {withTheme: true})
)(Sidebar);
