import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {logout} from 'redux/actions/auth';

// Material UI Styles
import {withStyles} from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import {SuperAdminMenuItemData} from 'layouts/MenuItemData/MenuItemData';
import {AdminMenuItemData} from '../../MenuItemData/MenuItemData';

const drawerWidth = 250;

const Styles = theme => ({
  drawerPaper: {
    backgroundColor: '#5E1619',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'fixed'
    }
  },
  toolbar: {
    ...theme.mixins.toolbar
  }
});


class Sidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onHandleDrawerToggle: PropTypes.func.isRequired,
    mobileOpen: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  state = {
    advancedMenuOpen: false,
    accountsMenuOpen: false
  };

  onLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {
      classes,
      location: {pathname},
      onHandleDrawerToggle,
      mobileOpen,
      user
    } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {user.user_type_id === 'super_admin' ? <SuperAdminMenuItemData onLogout={this.onLogout} pathname={pathname} /> : null}
        {user.user_type_id === 'admin' ? <AdminMenuItemData onLogout={this.onLogout} pathname={pathname} /> : null}
      </div>
    );

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            containerStyle={{transform: 'none'}}
            open={mobileOpen}
            onClose={onHandleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}
const withRedux = connect(null, {logout});

export default compose(
  withRouter,
  withRedux,
  withStyles(Styles, {withTheme: true})
)(Sidebar);
