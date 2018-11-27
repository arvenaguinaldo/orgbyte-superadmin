import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  }
};

function SimpleAppBar(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <img src="https://i.postimg.cc/br462DQ5/Untitled-1.gif" alt="spinner" />
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
