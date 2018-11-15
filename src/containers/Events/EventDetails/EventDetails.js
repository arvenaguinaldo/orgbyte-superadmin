import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import moment from 'moment';

// Material UI
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LocationIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import PersonPlusIcon from '@material-ui/icons/PersonAdd';
import EventIcon from '@material-ui/icons/Event';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {createStructuredSelector} from 'reselect';
import {makeSelectEvent, makeSelectAttendees, makeSelectSuccess, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvent, attend, fetchAttendees} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import styles from './EventDetails.scss';

class EventDetails extends Component {
  static propTypes = {
    event: PropTypes.object,
    success: PropTypes.bool,
    attend: PropTypes.func,
    attendees: PropTypes.array
  };

  static defaultProps = {
    event: {},
    attendees: []
  };

  /* eslint-disable */
  onHandleCheckIn = (event, value) => {
    event.preventDefault();
    const {match: {params}} = this.props;
    const attendee_id = value.event_attendee_type_name === 'Non-Bulsuan' ? value.id : value.student_number;
    const parameters = {qr_result: attendee_id, event_id: params.id};
    this.props.attend(parameters);
  };
  /* eslint-disable */

  state = {
    columns: [
      {
        name: 'Id',
        options: {
          display: false,
          filter: false
        }
      },
      {
        name: 'Student No.',
        options: {
          filter: false
        }
      },
      {
        name: 'Name\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
        options: {
          filter: false
        }
      },
      {
        name: 'Email-Address\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
        options: {
          filter: false
        }
      },
      {
        name: 'Contact No.',
        options: {
          filter: false
        }
      },
      {
        name: 'Course',
        options: {
          filter: true
        }
      },
      {
        name: 'Course Year Section Group',
        options: {
          filter: true
        }
      },
      {
        name: 'Attendee Type',
        options: {
          filter: true
        }
      },
      {
        name: 'Payment Status',
        options: {
          filter: true
        }
      },
      {
        name: 'Action Button',
        options: {
          filter: false,
          customBodyRender: (value) => {
            return (
              <Button
                className={value.attendance ? styles.buttonSuccess : null}
                color="primary"
                variant="contained"
                type="submit"
                disabled={moment().isSameOrAfter(this.props.event.starts) && moment().isSameOrBefore(this.props.event.ends) ? false : true}
                onClick={(e) => this.onHandleCheckIn(e, value)}
              >
                {this.props.success && value.attendance ? 'ATTENDED' : 'ATTEND'}
              </Button>
            );
          }
        }
      }
    ]
  };

  render() {
    const {event, attendees} = this.props;
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false
    };

    const style = {
      height: 400
    };

    const image = 'https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png';

    const attendDisable = moment().isSameOrAfter(this.props.event.starts) && moment().isSameOrBefore(this.props.event.ends);
    const registerDisable = moment().isAfter(this.props.event.ends);

    return (
      <LayoutWithTopbarAndSidebar>
        <Paper className={styles.Paper}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={40}>
                <Grid item xs={10} sm={10} md={6} >
                  <Typography variant="h4" color="secondary" >{event.name}</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon >
                        <EventIcon />
                      </ListItemIcon>
                      <Typography variant="h6" className={styles.listTitle}>Date Starts:</Typography>
                      <ListItemText primary={<Typography variant="h6">{event.starts && moment(event.starts).format('MMMM Do YYYY, h:mm a')}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon >
                        <EventIcon />
                      </ListItemIcon>
                      <Typography variant="h6" className={styles.listTitle}>Date Ends:</Typography>
                      <ListItemText primary={<Typography variant="h6">{event.ends && moment(event.ends).format('MMMM Do YYYY, h:mm a')}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon />
                      </ListItemIcon>
                      <Typography variant="h6" className={styles.listTitle}>Venue:</Typography>
                      <ListItemText primary={<Typography variant="h6">{event.venue}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <Typography variant="h6" className={styles.listTitle}>Number of Attendees:</Typography>
                      <ListItemText primary={<Typography variant="h6">{event.number_of_attendees}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <PersonPlusIcon />
                      </ListItemIcon>
                      <Typography variant="h6" className={styles.listTitle}>Available Slots:</Typography>
                      <ListItemText primary={<Typography variant="h6">{event.available_slots}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" component="p" className={styles.listIcon}>₱</Typography>
                      </ListItemIcon>
                      <Typography variant="h6" className={styles.bold}>Ticket Price:</Typography>
                    </ListItem>

                    {event.members === true ? (
                      <ListItem className={styles.nested}>
                        <Typography variant="subtitle1" className={styles.bold}>Members:</Typography>
                        <ListItemText primary={<Typography variant="subtitle1">{event.members_price === null ? 'FREE' : event.members_price }</Typography>} />
                      </ListItem>
                    ) : null}

                    {event.bulsuans === true ? (
                      <ListItem className={styles.nested}>
                        <Typography variant="subtitle1" className={styles.bold}>Bulsuans:</Typography>
                        <ListItemText primary={<Typography variant="subtitle1">{event.bulsuans_price === null ? 'FREE' : event.bulsuans_price }</Typography>} />
                      </ListItem>
                    ) : null}

                    {event.non_bulsuans === true ? (
                      <ListItem className={styles.nested}>
                        <Typography variant="subtitle1" className={styles.bold}>Non - Bulsuans:</Typography>
                        <ListItemText primary={<Typography variant="subtitle1">{event.non_bulsuans_price === null ? 'FREE' : event.non_bulsuans_price }</Typography>} />
                      </ListItem>
                    ) : null}
                  </List>

                  <Typography variant="body1" color="secondary" align="justify" className={styles.eventDescription}>
                    {event.description}
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={5} >
                  <CardMedia className={styles.eventImage}>
                    <img src={image} style={style} alt={image} />
                  </CardMedia>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className={styles.actionsDiv}>
            {event.nature_of_event === "curricular" && <Button component={Link} to={'/admin/events/' + event.id + '/generatecertificate'} size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Generate Certificate
            </Button>}
            <Button component={Link} to={'/admin/events/' + event.id + '/register'} size="small" disabled={registerDisable} variant="contained" color="primary" className={styles.actionsButton}>
                      Register
            </Button>
            <Button component={Link} to={'/admin/events/' + event.id + '/checkin'} target="_blank" disabled={!attendDisable} size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Check In
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Edit Event
            </Button>
          </div>
        </Paper>
        <MUIDataTable
          title={'Attendees List'}
          data={attendees.map((attendee) => {
            return [
              attendee.id,
              attendee.student_number,
              attendee.last_name + ',  ' + attendee.first_name + ' ' + attendee.middle_name,
              attendee.email,
              attendee.contact_number,
              attendee.course_name,
              attendee.year_level + attendee.section + ' - G' + attendee.group,
              attendee.event_attendee_type_name,
              attendee.payment_status === true ? 'PAID' : 'NOT PAID',
              attendee
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  attendees: makeSelectAttendees(),
  success: makeSelectSuccess(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchEvent,
  fetchAttendees,
  attend
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchEvent(params.id);
  props.fetchAttendees(params.id);
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout
)(EventDetails);
