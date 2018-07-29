import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Topbar from 'layouts/sections/Topbar/Topbar';
import Sidebar from 'layouts/sections/Sidebar/Sidebar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#EEEEEE',
    padding: theme.spacing.unit * 3
  }
});

class LayoutWithTopbarAndSidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  }

  state = {
    open: false
  };

  handleSidebarOpen = () => {
    this.setState({open: true});
  };

  handleSidebarClose = () => {
    this.setState({open: false});
  };

  render() {
    const {open} = this.state;
    const {classes, children} = this.props;
    return (
      <div className={classes.root}>
        <Topbar open={open} onRequestSidebarOpen={this.handleSidebarOpen} />
        <Sidebar open={open} onRequestSidebarClose={this.handleSidebarClose} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}


export default withStyles(styles, {withTheme: true})(LayoutWithTopbarAndSidebar);
