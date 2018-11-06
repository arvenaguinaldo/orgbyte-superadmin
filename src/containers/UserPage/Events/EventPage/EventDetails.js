import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';

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
    <Card className={classes.card}>
      <Grid container>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <CardContent>

            <Grid container>
              <div className={classes.container}>
                <Typography className={classes.title} gutterBottom>
        Event Name
                </Typography>
                <Typography variant="h6" className={classes.Text}>CICT FACULTY EVALUATION</Typography>
                <Typography color="textSecondary" gutterBottom>
        by: CICT FACULTY
                </Typography>
              </div>


              <Grid container>
                <div className={classes.container}>
                  <Typography className={classes.title} gutterBottom>
        Duration
                  </Typography>
                  <Grid container spacing={24}>
                    <Center>
                      <Grid item lg={4} md={4} sm={12} xs={12} className={classes.gridpad}>
                        <Center>
                          <Typography variant="body1" >OCT <span className={classes.date} >28</span>, 2018</Typography>
                        </Center>
                      </Grid>
                      <Grid item lg={4} md={4} sm={12} xs={12} className={classes.gridpad}>
                        <Center>
                          <Typography variant="body1" >to</Typography>
                        </Center>
                      </Grid>
                      <Grid item lg={4} md={4} sm={12} xs={12} className={classes.gridpad}>
                        <Center>
                          <Typography variant="body1" >OCT <span className={classes.date} >29</span>, 2018</Typography>
                        </Center>
                      </Grid>
                    </Center>
                  </Grid>
                </div>
              </Grid>

              <div className={classes.container}>
                <Typography className={classes.title} gutterBottom>
        Slots
                </Typography>
                <Typography variant="h6" className={classes.Text}> 400/450</Typography>
              </div>

              <div className={classes.container}>
                <Typography className={classes.title} gutterBottom>
        Price
                </Typography>
                <Typography variant="h6" className={classes.Text}>PHP 1,000.00  </Typography>
              </div>

              <div className={classes.container}>
                <Typography className={classes.title} gutterBottom>
        Date and Time
                </Typography>
                <Typography variant="subtitle1" className={classes.Text}>Sat, October 27, 2018</Typography>
                <Typography variant="subtitle1" className={classes.Text}>5:00 PM – 8:00 PM</Typography>
              </div>

              <div className={classes.container}>
                <Typography className={classes.title} gutterBottom>
       Location
                </Typography>
                <Typography variant="subtitle1" className={classes.Text}>Bitas Covered Court San Roque Bitas Arayat, Pampanga 2012 </Typography>
              </div>

            </Grid>

          </CardContent>

        </Grid>

        <Grid item lg={9} md={9} sm={12} xs={12}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
        Description
            </Typography>
            <Typography variant="subtitle1" component="h2">
        Join us on an evening of Christian music for the whole family! Proceeds for this event will go towards the building of our church.
            </Typography>
          </CardContent>

          <CardContent>
            <Typography className={classes.title} gutterBottom>
       Directions
            </Typography>
            <Card className={classes.Map} />
          </CardContent>
        </Grid>


      </Grid>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
