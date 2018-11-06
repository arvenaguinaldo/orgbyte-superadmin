import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardMedia} from '@material-ui/core';

const styles = {
  annou: {
    width: '100%',
    height: '100%'
  },
  image2: {
    backgroundColor: 'blue',
    height: '400px ',
    width: '100%'
  }
};
function Example(props) {
  const {classes} = props;
  return (
    <Card className={classes.image2}>
      <CardMedia
        className={classes.annou}
        image="https://i.postimg.cc/SK7zN7b0/20180719084047-MG-8852.jpg"
      />
    </Card>

  );
}
Example.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Example);
