import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TabBar from './Tab';

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
  app: {
    backgroundColor: 'white',
    borderBottom: 'solid 5px #5C181D'
  },
  logo: {
    Width: '100%',
    Height: '100%'
  },
  log: {
    height: '100%',
    width: '100%'
  },
  Menu: {
    width: '100%',
    height: '100%'
  }
};


function DenseAppBar(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.app}>
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className={classes.logo}>
                <img src="https://i.postimg.cc/59CnSdDj/logo23.png" alt="logo" className={classes.log} />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className={classes.Menu}>
                <TabBar />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DenseAppBar);
