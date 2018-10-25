import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Topbar from './sections/Topbar/Topbar';
import Footer from './sections/Footer/Footer';

const styles = ({
  root: {
    flexGrow: 1
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
