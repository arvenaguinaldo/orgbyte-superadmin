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
import ManageIcon from '@material-ui/icons/Person';
import AdvanceIcon from '@material-ui/icons/Settings';
import Info from '@material-ui/icons/Info';
import Mail from '@material-ui/icons/Mail';
import SMS from '@material-ui/icons/Sms';
import Add from '@material-ui/icons/Add';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Account from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Shop from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import style from './Sidebar.scss';

const drawerWidth = 240;

const Styles = theme => ({
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
    paddingTop: '10px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScree
    }),
    width: theme.spacing.unit * 9,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 8
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 10px',
    ...theme.mixins.toolbar
  },
  nested: {
    paddingLeft: '50px'
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

  handleClickAdvanced = () => {
    this.setState(state => ({advancedMenuOpen: !state.advancedMenuOpen}));
  };
  handleClickAccounts = () => {
    this.setState(state => ({accountsMenuOpen: !state.accountsMenuOpen}));
  };

  render() {
    const {
      classes,
      location: {pathname},
      theme,
      open,
      onRequestSidebarClose
    } = this.props;

    const {
      advancedMenuOpen
    } = this.state;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onRequestSidebarClose} className={style.listIcon}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <MenuList
          subheader={<ListSubheader className={classNames(style.subHeader, !open && classes.hide)} component="div">Administration</ListSubheader>}
        >
          <MenuItem component={Link} to="/events" selected={pathname === '/events'}>
            <ListItemIcon>
              <ManageIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Membership</Typography>} />
          </MenuItem>

          <MenuItem >
            <ListItemIcon>
              <Shop className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Org Shirt</Typography>} />
          </MenuItem>

          <MenuItem button onClick={this.handleClickAdvanced} selected={pathname === '/backup'} >
            <ListItemIcon>
              <AdvanceIcon className={style.listIcon} />
            </ListItemIcon>
            <ListItemText inset primary={<Typography variant="subheading" className={style.list}>Event</Typography>} />
            {advancedMenuOpen || !onRequestSidebarClose ? <ExpandLess className={style.expandIcon} /> : <ExpandMore className={style.expandIcon} />}
          </MenuItem>

          <Collapse in={advancedMenuOpen && open} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>

              <MenuItem component={Link} to="/backup" selected={pathname === '/backup'} className={classes.nested}>
                <ListItemIcon>
                  <Add className={style.listIcon} />
                </ListItemIcon>
                <ListItemText inset primary={<Typography variant="body1" className={style.list}>Add Event</Typography>} />
              </MenuItem>

            </MenuList>
          </Collapse>
        </MenuList>
        <MenuList
          subheader={<ListSubheader className={classNames(style.subHeader, !open && classes.hide)} component="div">Communication</ListSubheader>}
        >
          <MenuItem>
            <ListItemIcon>
              <Info className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Announcements</Typography>} />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Mail className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Mail</Typography>} />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SMS className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>SMS</Typography>} />
          </MenuItem>
        </MenuList>
        <MenuList
          subheader={<ListSubheader className={classNames(style.subHeader, !open && classes.hide)} component="div">User</ListSubheader>}
        >
          <MenuItem>
            <ListItemIcon>
              <Account className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Manage Accounts</Typography>} />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Lock className={style.listIcon} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subheading" className={style.list}>Change Password</Typography>} />
          </MenuItem>
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
