import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {loadCSS} from 'fg-loadcss/src/loadCSS';
import {Link} from 'react-router-dom';
import moment from 'moment';


// import {MuiThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import AttendTheme from 'styles/AttendTheme';
import Paper from '@material-ui/core/Paper';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Person from '@material-ui/icons/Person';
import PersonCheckIn from '@material-ui/icons/HowToReg';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import {createStructuredSelector} from 'reselect';
import {makeSelectEvent, makeSelectAttendees, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvent, attend, fetchAttendees} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingData from 'hoc/showLoadingWhileFetchingData';


import Center from 'react-center';

import styles from './CheckIn.scss';


function searchingFor(term) {
  return function (x) { // eslint-disable-line
    const year_level = x.year_level && x.year_level.toString(); // eslint-disable-line
    const section = x.section;
    const dash = '-';
    const g = 'g';
    console.log(x.year_level);
    const group = x.group.toString();
    return x.first_name.toLowerCase().includes(term.toLowerCase()) || x.last_name.toLowerCase().includes(term.toLowerCase())
    || (x.student_number && x.student_number.toLowerCase().includes(term.toLowerCase())) || (x.course_namee && x.course_namee.toLowerCase().includes(term.toLowerCase()))
    || (x.year_level && year_level.toString().toLowerCase().includes(term.toLowerCase())) || (x.year_level && year_level.concat(section, dash, g, group).toLowerCase().includes(term.toLowerCase()))
    || !term;
  };
}


class CheckIn extends Component {
  static propTypes = {
    event: PropTypes.object,
    attend: PropTypes.func,
    attendees: PropTypes.array
  };

  static defaultProps = {
    event: {},
    attendees: []
  };

  state = {
    term: '',
    attendees: []
  }

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  onHandleCheckIn = (event, value) => {
    event.preventDefault();
    const {match: {params}} = this.props; // eslint-disable-line
    const attendeeId = value.event_attendee_type_name === 'Non-Bulsuan' ? value.id : value.student_number;
    const parameters = {qr_result: attendeeId, event_id: params.id};
    this.props.attend(parameters);
  };

  searchHandler = (event) => {
    event.preventDefault();
    this.setState({term: event.target.value});
  }

  render() {
    const {event, attendees} = this.props;
    const {term} = this.state;

    const attendDisable = moment().isSameOrAfter(this.props.event.starts) && moment().isSameOrBefore(this.props.event.ends);
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="default" className={styles.eventName}>
              {event.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <Center>
          <Paper className={styles.paper} elevation={0} square={false}>
            <Grid container spacing={32}>
              <Grid item xs={12} sm={12} md={1}>
                <Center>
                  <Tooltip title="Use Qr Scanner" placement="bottom">
                    <Icon
                      component={Link}
                      to={'/admin/events/' + event.id + '/qrscanner'}
                      className={classNames(styles.qrIcon, 'fas fa-qrcode')}
                      color="primary"
                    />
                  </Tooltip>
                </Center>
              </Grid>
              <Grid item xs={12} sm={12} md={11}>
                <TextField
                  id="outlined-full-width"
                  label="Search Attendees"
                  placeholder="Search by Attendee Name, Student Number, Section, Course"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  color="primary"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.searchHandler}
                />
              </Grid>
            </Grid>
            <Typography gutterBottom variant="h6" color="default">
              Attendees
            </Typography>
            <Divider light />
            <List>
              {attendees.sort((a, b) => ((a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))).filter(searchingFor(term)).map((attendee) => { // eslint-disable-line
                return (
                  <div key={attendee.id}>
                    <ListItem>
                      <ListItemIcon>
                        {attendee.attendance ? (
                          <PersonCheckIn className={styles.listIcon} />
                        ) : (
                          <Person className={styles.listIcon} />
                        )}
                      </ListItemIcon>
                      <Paper>
                        <Typography variant="h6" color="default">{attendee.last_name + ',  ' + attendee.first_name + ' ' + attendee.middle_name}</Typography>
                        {attendee.student_number && <Typography className={styles.secondaryText} variant="body1" color="default">{attendee.student_number}</Typography>}
                        {attendee.course_namee && <Typography className={styles.secondaryText} variant="body1" color="default">{attendee.course_namee}</Typography>}
                        {attendee.year_level && <Typography className={styles.secondaryText} variant="body1" color="default">{attendee.year_level + attendee.section + ' - G' + attendee.group}</Typography>}
                        <Typography className={styles.secondaryText} variant="body1" color="default">{attendee.event_attendee_type_name}</Typography>
                        <Typography className={styles.secondaryText} variant="body1" color="default">{attendee.payment_status === true ? 'PAID' : 'NOT PAID'}</Typography>
                        <Button
                          className={attendee.attendance ? styles.buttonSuccess : styles.button}
                          color="primary"
                          variant="contained"
                          onClick={e => this.onHandleCheckIn(e, attendee)}
                          disabled={!attendDisable}
                        >
                          {attendee.attendance ? 'ATTENDED' : 'ATTEND'}
                        </Button>
                      </Paper>
                    </ListItem>
                    <Divider light />
                  </div>
                );
              })}
            </List>
          </Paper>

        </Center>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  attendees: makeSelectAttendees(),
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

const withLoadingWhileFetchingData = showLoadingWhileFetchingData((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingData
)(CheckIn);

