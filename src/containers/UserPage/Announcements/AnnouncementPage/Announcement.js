import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';
import Soon from './Soonest';
import Banner from './Banner';

const styles = {
  root: {
    flexGrow: 1
  }
};

class AnnouncementList extends Component {
  static propTypes = {
    // classes: PropTypes.object.isRequired
  };
  render() {
    // const {classes} = this.props;
    return (
      <TopBarAndFooter>
        <Banner />
        <Soon />
      </TopBarAndFooter>
    );
  }
}

export default withStyles(styles)(AnnouncementList);
