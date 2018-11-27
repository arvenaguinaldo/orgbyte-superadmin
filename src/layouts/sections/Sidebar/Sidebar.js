import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {logout} from 'redux/actions/auth';

// Material UI Styles
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import {SuperAdminMenuItemData} from 'layouts/MenuItemData/MenuItemData';
import {AdminMenuItemData} from '../../MenuItemData/MenuItemData';
import styles from './Sidebar.scss';

// const drawerWidth = 250;

const Styles = theme => ({
  drawerPaper: {
    // backgroundColor: this.props.organization.color_theme,
    // width: drawerWidth,
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
    // organization: PropTypes.object.isRequired,
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
        <div className={classes.toolbar}>
          {(user.user_type_id === 'admin' || user.user_type_id === 'sub_admin') &&
          <div className={styles.NameContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={2}>
                <Avatar
                  alt="Organization_logo"
                  src={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + user.logo_blobs[0].key}
                  className={styles.Avatar}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <Typography variant="h6" noWrap className={styles.LastName}>{user.last_name}</Typography>
                <Typography variant="h6" noWrap className={styles.FirstName}>{user.first_name}</Typography>
                <Typography variant="subtitle1" noWrap className={styles.Position}>{user.position}</Typography>
              </Grid>
            </Grid>
          </div>
          }
          {user.user_type_id === 'super_admin' &&
          <div className={styles.NameContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={2}>
                <Avatar
                  alt="Organization_logo"
                  src="https://i.postimg.cc/nVGQ2Lqs/ang-pogi-ni-jeremiah-Robles.png"
                  className={styles.Avatar}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <Typography variant="h6" noWrap className={styles.SuperAdminLabel}>Orgbyte</Typography>
              </Grid>
            </Grid>
          </div>
          }

        </div>
        {user.user_type_id === 'super_admin' ? <SuperAdminMenuItemData onLogout={this.onLogout} pathname={pathname} /> : null}
        {user.user_type_id === 'admin' || user.user_type_id === 'sub_admin' ? <AdminMenuItemData onLogout={this.onLogout} pathname={pathname} /> : null}
        <div className={classes.toolbar} />
      </div>
    );

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
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
