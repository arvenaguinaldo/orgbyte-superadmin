import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Topbar from 'layouts/sections/Topbar/Topbar';
import Sidebar from 'layouts/sections/Sidebar/Sidebar';

import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createStructuredSelector} from 'reselect';
import {makeSelectCurrentUser} from 'redux/selectors/auth';

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
    backgroundColor: '#EEEEEE',
    padding: theme.spacing.unit * 3
  },
  mobileContent: {
    marginLeft: 5,
    width: `calc(100% - ${drawerWidth}px)`
  }
});

class LayoutWithTopbarAndSidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    user: PropTypes.object.isRequired
  }

<<<<<<< HEAD
  render() {
    const {classes, children} = this.props;
    return (
      <div className={classes.root}>
        <Topbar />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
=======
  state = {
    mobileOpen: false,
    user: {}
  };

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };

  render() {
    const {mobileOpen} = this.state;
    const {classes, children, user} = this.props;
    return (
      <div className={classes.root}>
        <Sidebar user={user} mobileOpen={mobileOpen} onHandleDrawerToggle={this.handleDrawerToggle} />
        <div className={classes.appFrame}>
          <Topbar user={user} onHandleDrawerToggle={this.handleDrawerToggle} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
>>>>>>> 77f23de545b4f7c85975e8b3f97b9f67dd54aaf0
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser()
});

const withRedux = connect(mapStateToProps, null);

export default compose(
  withRedux,
  withStyles(styles, {withTheme: true})
)(LayoutWithTopbarAndSidebar);
