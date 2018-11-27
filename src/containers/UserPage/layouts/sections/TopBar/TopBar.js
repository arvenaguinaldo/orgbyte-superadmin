import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import TabBar from './Tab';

const styles = {
  root: {
    flexGrow: 1,
    paddingRight: 0
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
  app: {
    backgroundColor: 'white',
    borderBottom: 'solid 5px #5C181D',
    padding: 0
  },
  logo: {
    Width: '100%',
    Height: '100%'
  },
  log: {
    height: '45%',
    width: '50%',
    marginTop: '2%  '
  },
  menu: {
    width: '100%',
    margin: 'none'
  },
  right: {
    padding: 'none'
  },
  bar: {
    padding: 0
  }
};


function DenseAppBar(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.app}>
        <Toolbar variant="dense" className={classes.bar}>
          <Grid container spacing={0}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div className={classes.logo}>
                <Center>
                  <img src="https://i.postimg.cc/59CnSdDj/logo23.png" alt="logo" className={classes.log} />
                </Center>
              </div>
            </Grid>
            <Grid item lg={3} md={3} sm={false} xs={false} />
            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.right}>
              <TabBar className={classes.menu} />
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
