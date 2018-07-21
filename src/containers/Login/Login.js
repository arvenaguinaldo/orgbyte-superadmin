import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  card: {
    minWidth: 275,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '100px',
    paddingBottom: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    textAlign: 'center'
  },
  button: {
    background: '#5E1619',
    '&:hover': {
      backgroundColor: '#e2e1e0',
      color: '#5E1619'
    }
  }
});


function SimpleCard(props) {
  const {classes} = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textPrimary" variant="display1">
            Login
          </Typography>
          <TextField
            id="full-width"
            label="Username"
            placeholder="Enter Username"
            fullWidth
            margin="normal"
          />
          <TextField
            id="full-width"
            label="Password"
            placeholder="Enter Password"
            fullWidth
            margin="normal"
            type="password"
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" className={classes.button} fullWidth="true">
          Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
