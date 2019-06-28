import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import TabBar from './Tab';
import TopBarMobile from './TopBarMobile';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: '104px',
    width: '100%'
  },
  app: {
    position: 'relative',
    zIndex: 1400,
    backgroundColor: '#5c181d',
    color: 'white',
    width: '100%',
    height: '50px',
    margin: 0,
    padding: 0
  },
  logo: {
    Width: '100%',
    Height: '100%'
  },
  log: {
    height: '45%',
    width: '50%',
    marginTop: '2%'
  },
  menu: {
    width: '100%',
    margin: 'none'
  },
  right: {
    padding: 'none'
  },
  bar: {
    padding: 0
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  }
});

class DenseAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    topBarMobileOpen: false
  };

  toggleDrawer = () => {
    this.setState({
      topBarMobileOpen: !this.state.topBarMobileOpen
    });
  };

  render() {
    const {classes} = this.props;
    const {topBarMobileOpen} = this.state;

    return (
      <div className={classes.root}>
        <Hidden lgUp>
          <TopBarMobile topBarMobileOpen={topBarMobileOpen} onToggleDrawer={this.toggleDrawer} />
          <AppBar position="static" className={classes.app}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                className={classes.navIconHide}
                onClick={this.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <TabBar displayLogo={false} />
            </Toolbar>
          </AppBar>
        </Hidden>

        <Hidden mdDown>
          <AppBar position="static" className={classes.app}>
            <TabBar displayLogo />
          </AppBar>
        </Hidden>
      </div>
    );
  }
}


export default withStyles(styles)(DenseAppBar);
