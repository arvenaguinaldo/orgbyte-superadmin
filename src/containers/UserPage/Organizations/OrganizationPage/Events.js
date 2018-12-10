import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Moment from 'moment';
import Center from 'react-center';

import {makeSelectEventsList, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvents} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';


// Material UI
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Paper, ListItem} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Venue from '@material-ui/icons/PinDrop';
import Event from '@material-ui/icons/Event';

// import TimeAgo from 'react-timeago';
// import English from 'react-timeago/lib/language-strings/en';
// import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import style from './Events.scss';

// const formatter = buildFormatter(English);


const styles = {
  card: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    maxHeight: 1100,
    overflow: 'scroll'
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
    width: '1200px',
    height: '200px',
    margin: '5px',
    padding: '0px',
    '&:hover': {
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
      cursor: 'pointer'
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
  },
  CardMedia: {
    height: '100%',
    marginLeft: '5px',
    objectFit: 'cover'
  },
  filter: {
    padding: 30,
    marginTop: 5
  },
  AnnouncementContent: {
    height: '175px',
    overflow: 'hidden',
    marginLeft: '20px',
    marginTop: '10px',
    textAlign: 'justify'
  },
  Avatar: {
    height: '100px',
    width: '100px',
    marginTop: '5px'
  },
  ColumnTitle: {
    marginTop: '15px',
    textAlign: 'center'
  },
  ColumnSubTitle: {
    marginLeft: '33px'
  },
  RelativeTime: {
    marginLeft: '1px',
    marginTop: '40px',
    textAlign: 'center'
  },
  timeAgoSpan: {
    color: '#7e7e7e',
    fontSize: 16
  },
  Content: {
    marginTop: 25
  }
};

class Events extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    id: PropTypes.number
  };
  static defaultProps = {
    events: []
  };
  render() {
    const {classes, events, id} = this.props;
    console.log(events);
    // const today = moment(moment().toString()).format('YYYY-MM-DD h:mm a');
    return (
      id === undefined ? <Typography variant="h6">Loading..</Typography>
        :
        (
          <Card className={classes.card}>
            <Grid container spacing={0}>
              {events.filter(event => (id === event.organization_id ? event : null)).map((event) => {
                return (
                  <Grid item lg={4} md={4} sm={12} xs={12} key={event.id}>
                    <Link key={event.id} to={'/events/' + event.id}>
                      <Paper elevation={0} className={style.EventPaper}>

                        <Card className={style.EventCard}>
                          <CardMedia
                            className={style.EventImage}
                            image="https://i.postimg.cc/6pzTrRQ0/EVENTITCONGRESS.jpg"
                          />
                        </Card>

                        <Grid container className={style.EventDateContainer}>
                          <Center>
                            <Grid item lg={4} md={4} sm={4} xs={4} >
                              <Center>
                                <Typography variant="body1" className={style.EventMonth}>{Moment(event.starts).format('MMM')}</Typography>
                              </Center>
                              <Center>
                                <Typography variant="h5">{Moment(event.starts).format('DD')}</Typography>
                              </Center>
                            </Grid>
                          </Center>
                          <Grid item lg={10} md={10} sm={10} xs={10} >
                            <ListItem>
                              <ListItemIcon>
                                <Event />
                              </ListItemIcon>
                              <ListItemText inset primary={<Typography variant="body1" className={style.EventName}>{event.name}</Typography>} />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Venue />
                              </ListItemIcon>
                              <ListItemText inset primary={<Typography variant="body1" className={style.EventVenue}>{event.venue}</Typography>} />
                            </ListItem>
                            <Typography variant="caption" className={style.EventHost}>
                              {event.organization_name}
                            </Typography>

                          </Grid>
                        </Grid>
                      </Paper>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        )
    );
  }
}

const mapStateToProps = createStructuredSelector({
  events: makeSelectEventsList(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchEvents
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchEvents();
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles)
)(Events);
