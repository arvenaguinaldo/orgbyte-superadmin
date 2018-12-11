import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'moment';
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
import {Player} from 'video-react';

import 'video-react/dist/video-react.css';

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
    transform: 'translate(0%, -100%)',
    position: 'absolute',
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
    width: '100%'
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
  },
  Price: {
    marginLeft: '10px'
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
    Moment.locale('en');
    if (!event.image_blobs) {
      return null;
    }
    return (
      <TopBarAndFooter>
        <div className={classes.EventCoverImage} />
        <div className={classes.ImageDiv}>
          <CardMedia
            className={classes.Image}
            image={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + event.image_blobs[0].key}
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
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className={classes.container}>
                              <Typography className={classes.title}>
                                Event Name
                              </Typography>
                              <Typography variant="subtitle1" className={classes.Text}>
                                {event.name}
                              </Typography>
                              <Typography color="textSecondary" component={Link} to={'/organizations/' + event.organization_acronym}gutterBottom>
                                {event.organization_name}
                              </Typography>
                            </div>
                          </Grid>

                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container>
                              <div className={classes.container}>
                                <Typography className={classes.title} gutterBottom>
                                  Duration
                                </Typography>
                                <Grid container spacing={24}>
                                  <Center>
                                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.gridpad}>
                                      <Center>
                                        <Typography variant="body1" >{Moment(event.starts).format('MMM')} <span className={classes.date} >{Moment(event.starts).format('DD')}</span> {Moment(event.starts).format('YYYY')}</Typography>
                                      </Center>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.gridpad}>
                                      <Center>
                                        <Typography variant="body1" >to</Typography>
                                      </Center>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} className={classes.gridpad}>
                                      <Center>
                                        <Typography variant="body1" >{Moment(event.ends).format('MMM')} <span className={classes.date} >{Moment(event.ends).format('DD')}</span> {Moment(event.ends).format('YYYY')}</Typography>
                                      </Center>
                                    </Grid>
                                  </Center>
                                </Grid>
                              </div>
                            </Grid>
                          </Grid>

                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className={classes.container}>
                              <Typography className={classes.title}>
                                Slots
                              </Typography>
                              <Typography variant="subtitle1" className={classes.Text}>
                                {event.available_slots}/{event.number_of_attendees}
                              </Typography>
                            </div>
                          </Grid>

                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className={classes.container}>
                              <Typography className={classes.title} gutterBottom>
                                Ticket Price
                              </Typography>
                              {event.members === true ? (
                                <Typography variant="subtitle1">Member {event.members_price === null ? <Typography variant="body1" className={classes.Price}>Free</Typography> : <Typography variant="body1" className={classes.Price}>₱ {event.members_price}</Typography> }</Typography>
                              ) : null}

                              {event.bulsuans === true ? (
                                <Typography variant="subtitle1">BulSUan {event.bulsuans_price === null ? <Typography variant="body1" className={classes.Price}>Free</Typography> : <Typography variant="body1" className={classes.Price}>₱ {event.bulsuans_price}</Typography> }</Typography>
                              ) : null}

                              {event.non_bulsuans === true ? (
                                <Typography variant="subtitle1">Non-BulSUan {event.non_bulsuans_price === null ? <Typography variant="body1" className={classes.Price}>Free</Typography> : <Typography variant="body1" className={classes.Price}>₱ {event.non_bulsuans_price}</Typography> }</Typography>
                              ) : null}
                            </div>
                          </Grid>

                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className={classes.container}>
                              <Typography className={classes.title} gutterBottom>
                              Date and Time
                              </Typography>
                              <Typography variant="subtitle1" className={classes.Text}>{Moment(event.starts).format('ddd MMMM DD, YYYY')}</Typography>
                              <Typography variant="subtitle1" className={classes.Text}>{Moment(event.starts).format('h:mm A')}</Typography>
                            </div>
                          </Grid>

                          <div className={classes.container}>
                            <Typography className={classes.title} gutterBottom>
                               Location
                            </Typography>
                            <Typography variant="subtitle1" className={classes.Text}>{event.venue}</Typography>
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
                             Video
                        </Typography>
                        <Card className={classes.Map}>
                          <Player
                            playsInline
                            poster="/assets/poster.png"
                            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                          />
                        </Card>
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
