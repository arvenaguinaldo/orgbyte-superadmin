import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Top from '../layouts/TopBarAndFooter';
import Filter from './Filter';
import Results from './Results';

const styles = {
  root: {
    flexGrow: 1
  },
  content: {
    padding: 10
  },
  header: {
    padding: 10
  }
};

function Main(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <Top>
        <Grid container spacing={8} >
          <Grid item lg={3} md={3} sm={12} xs={12} className={classes.content} >
            <Filter />
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12} className={classes.content} >
            <Results />
          </Grid>
        </Grid>
      </Top>
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
