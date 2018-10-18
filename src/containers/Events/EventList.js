import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import Moment from 'moment';
import {Field, reduxForm} from 'redux-form';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import LocationIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';

import {makeSelectEventsList, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvents} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import styles from './EventList.scss';

class EventList extends Component {
  static propTypes = {
    events: PropTypes.array
  };

  static defaultProps = {
    events: []
  };

  render() {
    Moment.locale('en');
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="display1">
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
                  >
                    <MenuItem value={1}>Past</MenuItem>
                    <MenuItem value={2}>Incoming</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={10} sm={10} md={2}>
                  <Field
                    name="cost"
                    component={renderSelectField}
                    label="Cost"
                    fullWidth
                  >
                    <MenuItem value={1}>Paid</MenuItem>
                    <MenuItem value={2}>Free</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={10} sm={10} md={2}>
                  <Field
                    name="type_of_event"
                    component={renderSelectField}
                    label="Type of Event"
                    fullWidth
                  >
                    <MenuItem value={1}>Curricular</MenuItem>
                    <MenuItem value={2}>Co-curricular</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={10} sm={10} md={3} >
                  <Field
                    name="search"
                    component={renderTextField}
                    label="Search"
                    fullWidth
                    className={styles.searchField}
                  />
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </div>
        <div className={styles.eventContainer}>
          {this.props.events.map((event) => {
            return (
              <div key={event.id} className={styles.eventsDiv}>
                {/* <span>{event.name}</span>
                    <span>{event.venue}</span>
                    <span>{event.ticket_price}</span>
                    <span>{Moment(event.date_time).format('YYYY-MM-DD')}</span> */}
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
                    <Typography gutterBottom variant="headline" component="h2">
                      {event.name}
                    </Typography>
                    <List disablePadding dense className={styles.list}>
                      <ListItem >
                        <ListItemIcon>
                          <EventIcon className={styles.listIcon} />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" component="p">{Moment(event.date_time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
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
                          <Typography variant="body2" component="p" className={styles.listIcon}>₱</Typography>
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" component="p">{event.ticket_price}</Typography>
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
