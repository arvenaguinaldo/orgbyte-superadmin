import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Top from './TopBar';
import Banner from './Banner';
import Soon from './Soonest';
import Footer from './Footer';

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
