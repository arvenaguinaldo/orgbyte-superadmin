import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// import _ from 'lodash';
import Topbar from 'layouts/sections/Topbar/Topbar';
import Sidebar from 'layouts/sections/Sidebar/Sidebar';

import {MuiThemeProvider} from '@material-ui/core/styles';
import myTheme from 'styles/MyTheme';

import Hidden from '@material-ui/core/Hidden';

import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createStructuredSelector} from 'reselect';
import {makeSelectCurrentUser, makeSelectColorTheme} from 'redux/selectors/auth';
import {makeSelectCurrentOrganization} from 'redux/selectors/organizations';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    zIndex: 1,
    // overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    height: '100%',
    padding: theme.spacing.unit * 3
  },

  mobileContent: {
    flexGrow: 1,
    marginLeft: '4%',
    height: '100%',
    backgroundColor: '#EEEEEE',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing.unit * 5
  }
});

class LayoutWithTopbarAndSidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    user: PropTypes.object.isRequired,
    colorTheme: PropTypes.string.isRequired,
    organization: PropTypes.object
  }

  static defaultProps = {
    organization: {}
  };

  state = {
    mobileOpen: false,
    user: {}
  };

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };

  render() {
    const {mobileOpen} = this.state;
    const {classes, children, user, organization, colorTheme} = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={myTheme(colorTheme)}>
          <Sidebar user={user} organization={organization} mobileOpen={mobileOpen} onHandleDrawerToggle={this.handleDrawerToggle} />
          <div className={classes.appFrame}>
            <Topbar organization={organization} user={user} onHandleDrawerToggle={this.handleDrawerToggle} />

            <Hidden mdUp>
              <main className={classes.mobileContent}>
                <div className={classes.toolbar} />
                {children}
              </main>
            </Hidden>

            <Hidden smDown implementation="js">
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
              </main>
            </Hidden>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  organization: makeSelectCurrentOrganization(),
  colorTheme: makeSelectColorTheme()
});

const withRedux = connect(mapStateToProps, null);

export default compose(
  withRedux,
  withStyles(styles, {withTheme: true})
)(LayoutWithTopbarAndSidebar);
