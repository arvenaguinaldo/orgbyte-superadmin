import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Topbar from './sections/TopBar/TopBar';
import Footer from './sections/Footer/Footer';

const styles = ({
  root: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#F2F2F2'
  }
});

class TopBarAndFooter extends Component {
    static propTypes = {
      classes: PropTypes.object.isRequired,
      children: PropTypes.node.isRequired
    }

    render() {
      const {classes, children} = this.props;
      return (
        <div className={classes.root}>
          <Topbar />
          {children}
          <Footer />
        </div>
      );
    }
}

export default withStyles(styles)(TopBarAndFooter);
