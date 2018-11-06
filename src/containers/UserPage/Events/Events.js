import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Top from './EventPage/TopBar';
import Banner from './EventPage/Banner';
import Soon from './EventPage/Soonest';
import Footer from './EventPage/Footer';

const styles = {
  root: {
    flexGrow: 1
  }
};

function Main(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <Top />
      <Banner />
      <Soon />
      <Footer />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
