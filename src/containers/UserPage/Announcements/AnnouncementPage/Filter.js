import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    minWidth: 275
  },
  pos: {
    marginBottom: 12
  },
  text: {
    width: '100%'
  }
};

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card} nowrap>
      <CardContent>
        <Typography variant="h6" >
          FILTER ORGANIZATION
        </Typography>
        <TextField
          id="standard-name"
          label="TYPE"
          className={classes.text}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="CATEGORIES"
          className={classes.text}
          margin="normal"
        />
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
