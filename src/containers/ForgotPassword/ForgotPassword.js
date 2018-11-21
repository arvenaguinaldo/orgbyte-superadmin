import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    minWidth: 275,
    width: '30%',
    marginTop: '15%',
    borderRight: 'solid #7b180f 5px',
    borderLeft: 'solid #7b180f 5px'
  },
  button: {
    border: 'none'
  }
};

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h6">
              Forgot Password
        </Typography>
        <TextField
          name="email"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
                <Typography variant="caption">Email</Typography>
              </InputAdornment>
            )
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary">Submit</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
