import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Center from 'react-center';

import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createStructuredSelector} from 'reselect';
import {makeSelectEvent, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvent} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';

const bgImage = 'https://i.postimg.cc/FRzLXJfR/swits.jpg';

const styles = {
  root: {
    flexGrow: 1
  },
  EventDetails: {
    maxWidth: '70%'
  },
  Image: {
    width: '100%',
    height: '100%',
    objectFit: 'scale-down'
  },
  ImageDiv: {
    border: '3px solid #f1f1f1',
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -52%)',
    zIndex: '2',
    width: '100%',
    height: '400px',
    textAlign: 'center'
  },
  EventCoverImage: {
    backgroundImage: 'url(' + bgImage + ')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(7px)',
    WebkitFilter: 'blur(7px)',
    height: '400px ',
    width: '100%',
    marginTop: '45px'
  },
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  Description: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: '10px'
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

class EventPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    event: PropTypes.object
  };

  static defaultProps = {
    event: {}
  };
  render() {
    const {classes, event} = this.props;
    return (
      <TopBarAndFooter>
        <div className={classes.EventCoverImage} />
        <div className={classes.ImageDiv}>
          <CardMedia
            className={classes.Image}
            image="https://i.postimg.cc/FRzLXJfR/swits.jpg"
            title="Orgbyte Event Image"
            component="img"
            alt="Event Photo"
          />
        </div>
        <Center>
          <Paper className={classes.EventDetails}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card className={classes.card}>
                  <Grid container>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <CardContent>

                        <Grid container>
                          <div className={classes.container}>
                            <Typography className={classes.title} gutterBottom>
                              Event Name
                            </Typography>
                            <Typography variant="h6" className={classes.Text}>
                              {event.name}
                            </Typography>
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
                              Ticket Price
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
                        <Typography className={classes.Description} gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="subtitle1">
                          {event.description}
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
              </Grid>
            </Grid>
          </Paper>
        </Center>
      </TopBarAndFooter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  meta: makeSelectEventsMeta()
});

// const mapDispatchToProps = {
//   fetchEvent
// };

const withRedux = connect(mapStateToProps, {fetchEvent});

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchEvent(params.id);
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles)
)(EventPage);
