import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia, Paper} from '@material-ui/core';

const styles = {
  card: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  paper: {
    marginTop: 10,
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)',
      borderRight: 'solid balck 2px'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  type: {
    color: 'black'},
  media: {
    height: 120,
    width: '100%'
  },
  list: {
    padding: '0px',
    lineHeight: '10',
    paddingLeft: 0
  },
  listName: {
    padding: '0px',
    fontWeight: 'bold',
    lineHeight: '10',
    paddingLeft: 0
  },
  events1: {
    height: '100%',
    width: '100%'
  },
  paper2: {
    margin: '5px',
    padding: '0px',
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)'
    }
  },
  butt: {
    float: 'right'
  },
  annou: {
    width: '100%',
    height: '100%'
  },
  image2: {
    backgroundColor: 'blue',
    height: '100px  '
  },
  title2: {
    paddingTop: 10,
    boxShadow: 'none'
  }
};

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card}>
      <Grid container spacing={0}>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card className={classes.paper2}>
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Card className={classes.image2}>
                  <CardMedia
                    className={classes.annou}
                    image="https://i.postimg.cc/jdsys9Mz/announcement_Balangayan.jpg"
                  />
                </Card>
              </Grid>
              <Grid item xs={9} >
                <Paper className={classes.title2}>
                  <Typography variant="h6">
                Announcement Title
                  </Typography>
                  <Typography variant="caption">
                Established:
                  </Typography>
                  <Typography variant="body1">
               Organization Summary asjdbawubaskaaudhba aosdbawodjbaoidub sdja kdwdub asdjawn dasd oauiwd
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card className={classes.paper2}>
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Card className={classes.image2}>
                  <CardMedia
                    className={classes.annou}
                    image="https://i.postimg.cc/jdsys9Mz/announcement_Balangayan.jpg"
                  />
                </Card>
              </Grid>
              <Grid item xs={9} >
                <Paper className={classes.title2}>
                  <Typography variant="h6">
                Organization Name
                  </Typography>
                  <Typography variant="caption">
                Established:
                  </Typography>
                  <Typography variant="body1">
               Organization Summary asjdbawubaskaaudhba aosdbawodjbaoidub sdja kdwdub asdjawn dasd oauiwd
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
