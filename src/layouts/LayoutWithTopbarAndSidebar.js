import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import _ from 'lodash';
import Topbar from 'layouts/sections/Topbar/Topbar';
import Sidebar from 'layouts/sections/Sidebar/Sidebar';

import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createStructuredSelector} from 'reselect';
import {makeSelectCurrentUser} from 'redux/selectors/auth';
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
    user: PropTypes.object.isRequired,
    organization: PropTypes.array
  }

  state = {
    mobileOpen: false,
    user: {},
    organization: []
  };

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };

  render() {
    const {mobileOpen} = this.state;
    const {classes, children, user, organization} = this.props;
    return (
      <div className={classes.root}>
        <Sidebar user={user} mobileOpen={mobileOpen} onHandleDrawerToggle={this.handleDrawerToggle} />
        <div className={classes.appFrame}>
          <Topbar organization={organization} user={user} onHandleDrawerToggle={this.handleDrawerToggle} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  organization: makeSelectCurrentOrganization()
});

const withRedux = connect(mapStateToProps, null);

export default compose(
  withRedux,
  withStyles(styles, {withTheme: true})
)(LayoutWithTopbarAndSidebar);
