import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  pos: {
    marginBottom: 12
  },
  date: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  gridpad: {
    padding: 10
  },
  container: {
    padding: 10,
    marginBottom: 20
  },
  text: {
    fontWeight: 'none'
  },
  Map: {
    minWidth: '200px',
    width: '100%',
    height: '80%',
    background: 'blue'
  }
};

function SimpleCard(props) {
  const {classes} = props;
  return (
    <CardContent>
      <div className={classes.container}>
        <Typography variant="h6" className={classes.Text}> Society for the Welfare of Information Technology Students</Typography>
      </div>

      <div className={classes.container}>
        <Typography variant="subtitle1" className={classes.Text} gutterBottom>
        President
        </Typography>
        <Typography variant="h6" className={classes.Text}>Therelyn May Cruz  </Typography>
      </div>

      <div className={classes.container}>
        <Typography variant="subtitle1" className={classes.Text} gutterBottom>
        Established
        </Typography>
        <Typography variant="h6" className={classes.Text}>2001 </Typography>
      </div>

      <div className={classes.container}>
        <Typography variant="subtitle1" className={classes.Text} gutterBottom>
        Contact
        </Typography>
        <Typography variant="h6" className={classes.Text}>+63 906 1234 567 </Typography>
      </div>

    </CardContent>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
