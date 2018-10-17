import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Carrousel from './Carousel';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    height: 500,
    backgroundSize: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  media: {
    height: '120%'
  },
  input: {
    margin: theme.spacing.unit,
    width: '97%'
  }
});

function ImgMediaCard() {
  return (
    <Carrousel />
  );
}

export default withStyles(styles)(ImgMediaCard);
