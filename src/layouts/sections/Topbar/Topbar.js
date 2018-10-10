import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import * as currentOrg from 'utils/SetCurrentOrganization';

const drawerWidth = 250;

const styles = theme => ({
  appBar: {
    backgroundColor: '#363736',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

class Topbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    organization: PropTypes.object,
    onHandleDrawerToggle: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  static defaultProps = {
    organization: {}
  };

  render() {
    const {classes, onHandleDrawerToggle, user, organization} = this.props;

    return (
      <AppBar
        position="absolute"
        className={classes.appBar}
        color="secondary"
      >
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap >
            {user.name}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={onHandleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>

          {user.user_type_id === 'admin' ? (
            <Typography variant="title" color="inherit" noWrap >
              {organization.name}
            </Typography>
          ) :
            <Typography key={user.id} variant="title" color="inherit" noWrap >
              SUPER ADMIN
            </Typography>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Topbar);


// {user.user_type_id === 'admin' ? (
//   <Typography variant="title" color="inherit" noWrap >
//     {currentOrg.getOrganizationName()}
//   </Typography>
// ) : (
//   <Typography key={user.id} variant="title" color="inherit" noWrap >
//     SUPER ADMIN
//   </Typography>
// )}
