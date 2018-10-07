import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {CardMedia} from '@material-ui/core';

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
    maxWidth: 500,
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
  },
  card1: {
    maxWidth: '100%',
    zIndex: '-1'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    zIndex: '-1' // 16:9
  },
  link: {
    cursor: 'pointer',
    paddingTop: '10px',
    textAlign: 'center',
    '&:hover': {
      color: 'black'
    }
  },
  mainBg: {
    background: 'https://preview.ibb.co/h8vmvU/BGLOGIN.jpg'
  },
  logo: {
    minWidth: '200px',
    minHeight: '200px'
  }
});

function DenseAppBar(props) {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.mainBg}>
        <Grid item xs={12} xl={2} />
        <Grid item xs={12} xl={6}>
          <Card className={classes.card}>
            <Grid container spacing={0}>
              <Grid item xs={6} xl={6} >
                <CardMedia
                  className={classes.logo}
                  image="https://postimg.cc/image/5yu2s01fl/"
                />
              </Grid>
              <Divider />
              <Grid item xs={6} xl={6}>
                <CardContent className={classes.content}>
                  <Typography className={classes.title} color="primary" variant="display1">
              Login
                  </Typography>
                  <TextField
                    id="full-width1"
                    label="Username"
                    placeholder="Enter Username"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    id="full-width2"
                    label="Password"
                    placeholder="Enter Password"
                    fullWidth
                    margin="normal"
                    type="password"
                  />
                  <Typography variant="caption" className={classes.link}>
                Forgot Password?
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" className={classes.button} fullWidth>
          Login
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} xl={2} />
      </Grid>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DenseAppBar);
