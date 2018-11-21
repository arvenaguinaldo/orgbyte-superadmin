import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  spin: {
    backgroundColor: 'red',
    borderRadius: '100',
    width: '10%',
    height: '30%',
    border: 'solid blue 5px'
  }
};

function SimpleAppBar(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <div className={classes.spin} />
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
