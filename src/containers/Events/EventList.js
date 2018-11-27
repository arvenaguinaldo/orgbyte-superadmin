import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import Moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import LocationIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {makeSelectEventsList, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvents} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import styles from './EventList.scss';


function searchingFor(term) {
  return function (x) { // eslint-disable-line
    return x.name.toLowerCase().includes(term.toLowerCase());
  };
}

class EventList extends Component {
  static propTypes = {
    events: PropTypes.array
  };

  static defaultProps = {
    events: []
  };

  state = {
    time_period: 'reset',
    price_type: 'reset',
    nature: 'reset',
    term: ''
  }

   timePeriod = (date) => {
     Moment.locale('en');
     const dateToday = moment(moment().toString()).format('YYYY-MM-DD h:mm a');
     if (moment(date).format('YYYY-MM-DD h:mm a') < dateToday && this.state.time_period === 'past') {
       return date;
     } else if (moment(date).format('YYYY-MM-DD h:mm a') > dateToday && this.state.time_period === 'upcoming') {
       return date;
     } else if (this.state.time_period === 'reset') {
       return date;
     }
   }

  handleDay = (value) => {
    const day = {value};
    if (day.value === '1') {
      this.setState({time_period: 'past'});
    } else if (day.value === '2') {
      this.setState({time_period: 'upcoming'});
    } else { this.setState({time_period: 'reset'}); }
  }

  handlePrice = (value) => {
    const price = {value};
    if (price.value === '1') {
      this.setState({price_type: 'paid'});
    } else if (price.value === '2') {
      this.setState({price_type: 'free'});
    } else { this.setState({price_type: 'reset'}); }
  }

  searchHandler = (event) => {
    this.setState({term: event.target.value});
  }

  render() {
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4">
            Events
        </Typography>
        <div className={styles.sortContainer}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>

                <Grid item xs={10} sm={10} md={2}>
                  <Field
                    name="time_period"
                    component={renderSelectField}
                    label="Time Period"
                    fullWidth
                    onChange={event => this.handleDay(event.target.value)}
                  >
                    <option value={0}> &nbsp; </option>
                    <option value={1}>Past</option>
                    <option value={2}>Incoming</option>
                  </Field>
                </Grid>

                <Grid item xs={10} sm={10} md={2}>
                  <Field
                    name="ticket_price_type"
                    component={renderSelectField}
                    label="Ticket Price type"
                    fullWidth
                    onChange={event => this.handlePrice(event.target.value)}
                  >
                    <option value={0}> &nbsp; </option>
                    <option value={1}>Paid</option>
                    <option value={2}>Free</option>
                  </Field>
                </Grid>
                <Grid item xs={10} sm={10} md={2}>
                  <Field
                    name="nature_of_event"
                    component={renderSelectField}
                    label="Nature of Event"
                    fullWidth
                    onChange={event => this.handleNature(event.target.value)}
                  >
                    <option value="" />
                    <option value={1}>Curricular</option>
                    <option value={2}>Co-curricular</option>
                  </Field>
                </Grid>

                <Grid item xs={10} sm={10} md={3} >
                  <Field
                    name="search"
                    component={renderTextField}
                    label="Search"
                    fullWidth
                    className={styles.searchField}
                    onChange={this.searchHandler}
                  />
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </div>
        <div className={styles.eventContainer}>
          {this.props.events
            .filter(
              event => this.timePeriod(event.ends)
            )
            .filter(
              this.state.price_type !== 'reset' ? event => event.ticket_price_type === this.state.price_type : event => event.ticket_price_type === 'paid' || event.ticket_price_type === 'free'
            )
            .filter(
              this.state.nature !== 'reset' ? event => event.nature_of_event === this.state.nature : event => event.nature_of_event === 'co_curricular' || event.nature_of_event === 'curricular'
            )
            .filter(
              searchingFor(this.state.term)
            )
            .map((event) => {
              return (
                <Link key={event.id} to={'/admin/events/' + event.id}>
                  <div key={event.id}>
                    <Card className={styles.card}>
                      <CardMedia
                        component="img"
                        alt="Event Image"
                        height="200"
                        width="140"
                        image="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png"
                        title="Event Image"
                        className={styles.cardMedia}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {event.name}
                        </Typography>
                        <List disablePadding dense className={styles.list}>
                          <ListItem >
                            <ListItemIcon>
                              <EventIcon className={styles.listIcon} />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography variant="body2" component="p">{Moment(event.starts).format('MMMM Do YYYY, h:mm a')}</Typography>
                            </ListItemText>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <LocationIcon className={styles.listIcon} />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography variant="body2" component="p">{event.venue}</Typography>
                            </ListItemText>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <Typography variant="body2" component="p" className={styles.listIconPeso}>₱</Typography>
                            </ListItemIcon>
                            <ListItemText>
                              <Typography variant="body2" component="p">{event.members_price === null ? 'FREE' : event.members_price }</Typography>
                            </ListItemText>
                          </ListItem>
                        </List>
                      </CardContent>
                      <CardActions className={styles.actionsDiv}>
                        <Button size="small" color="primary">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Link>
              );
            })}
        </div>
      </LayoutWithTopbarAndSidebar>
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

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout,
  reduxForm({
    form: 'EmailForm',
    destroyOnUnmount: false
  }, null),
)(EventList);
