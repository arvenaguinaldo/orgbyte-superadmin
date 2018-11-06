import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import Top from './EventPage/TopBar';
import EventBanner from './EventPage/EventBanner';
import Footer from './EventPage/Footer';
import EventDetails from './EventPage/EventDetails';

const styles = {
  root: {
    flexGrow: 1
  },
  contents: {
    maxWidth: '70%'
  }
};

function Main(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <Top />
      <EventBanner />
      <Center>
        <Paper className={classes.contents}>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <EventDetails />
            </Grid>
          </Grid>
        </Paper>
      </Center>
      <Footer />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
