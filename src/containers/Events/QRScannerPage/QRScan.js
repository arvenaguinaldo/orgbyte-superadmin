import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import classNames from 'classnames';
import QrReader from 'react-qr-reader';
import moment from 'moment';

import Center from 'react-center';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {createStructuredSelector} from 'reselect';
import {makeSelectAttendee, makeSelectSuccess, makeSelectEvent, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvent, fetchAttendee, attend, settlePayment} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingData from 'hoc/showLoadingWhileFetchingData';

// import SubmitButton from 'components/SubmitButton/SubmitButton';
import styles from './QRScan.scss';

class QRScan extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    attendee: PropTypes.object.isRequired,
    meta: PropTypes.object,
    match: PropTypes.object,
    fetchAttendee: PropTypes.func,
    attend: PropTypes.func,
    settlePayment: PropTypes.func,
    success: PropTypes.bool
  };

  static defaultProps = {
    attendee: {}
  };

  state = {
    delay: 100,
    qr_result: ''
  };

  onHandleCheckIn = (event) => {
    event.preventDefault();
    const {match: {params}} = this.props;
    const parameters = {qr_result: this.state.qr_result, event_id: params.id};
    this.props.attend(parameters);
  }

  onHandleSettlePayment = (event) => {
    event.preventDefault();
    const {match: {params}} = this.props;
    const parameters = {qr_result: this.state.qr_result, event_id: params.id};
    this.props.settlePayment(parameters);
  }

  handleScan = (data) => {
    if (data) {
      console.log(data);
      const {match: {params}} = this.props;
      const parameters = {qr_result: data, event_id: params.id};
      this.setState({qr_result: data});
      this.props.fetchAttendee(parameters);
    }
  };


  handleError = (err) => {
    console.error(err);
  };
  render() {
    const {attendee, success, event, meta} = this.props;

    const buttonClassname = classNames({
      [styles.buttonSuccess]: success && attendee.attendance
    });

    const attendDisable = moment().isSameOrAfter(this.props.event.starts) && moment().isSameOrBefore(this.props.event.ends);

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" color="default" className={styles.eventName}>
              {event.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Center>
          <Typography variant="h4" color="secondary">QR Scanner</Typography>
        </Center>
        <Center>
          <Paper className={styles.Paper}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={12} md={6}>
                    <QrReader
                      delay={this.state.delay}
                      onError={this.handleError}
                      onScan={this.handleScan}
                      className={styles.Scanner}
                      resolution={1000}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {!meta.isFetchAttendeeLoading &&
                    <div>
                      <Typography variant="h4" color="secondary">Attendee Details</Typography>{console.log(attendee.last_name)}
                      { Object.keys(attendee).length === 0 || typeof attendee.last_name === 'undefined' ? (
                        <Center>
                          <div className={styles.InstructionsDiv}>
                            <Typography variant="h5" color="secondary">Please scan the qr code.</Typography>
                          </div>
                        </Center>
                      ) : (
                        <div className={styles.AttendeeDetailsDiv}>
                          <Grid container spacing={0}>
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary" className={styles.Label}>Name:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.last_name + ', ' + attendee.first_name + ' ' + attendee.middle_name}</Typography>
                              </Grid>
                            </Grid>

                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary" className={styles.Label}>Attendee Type:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.event_attendee_type_name}</Typography>
                              </Grid>
                            </Grid>
                            {attendee.student_number && attendee.event_attendee_type_name !== 'Non-Bulsuan' &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary" className={styles.Label}>Student Number:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.student_number}</Typography>
                              </Grid>
                            </Grid>
                            }

                            {attendee.college_name &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary" className={styles.Label}>College:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.college_name}</Typography>
                              </Grid>
                            </Grid>
                            }

                            {attendee.course_name &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary" className={styles.Label}>Course:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.course_namee}</Typography>
                              </Grid>
                            </Grid>
                            }

                            {attendee.year_level &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary" className={styles.Label}>Year/Section/Group:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.year_level + attendee.section + ' - G' + attendee.group}</Typography>
                              </Grid>
                            </Grid>
                            }

                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary"className={styles.Label}>Email:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.email}</Typography>
                              </Grid>
                            </Grid>

                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" color="secondary" className={styles.Label}>Payment Status:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="h6" color="secondary" className={styles.AttendeeDetail}>{attendee.payment_status === true ? 'PAID' : 'NOT PAID'}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    </div>
                    }
                    {meta.isFetchAttendeeLoading && <CircularProgress className={styles.loadingProgress} size={100} />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {Object.keys(attendee).length === 0 || typeof attendee.last_name === 'undefined' ?
              (null) :
              (
                <div className={styles.submitButtonDiv}>
                  {attendee.payment_status === true ? (
                    <Button fullWidth className={buttonClassname} disabled={!attendDisable} color="primary" variant="contained" onClick={this.onHandleCheckIn}>
                      {success && attendee.attendance ? 'ATTENDED' : 'ATTEND'}
                    </Button>
                  ) : (
                    <Button color="primary" variant="contained" onClick={this.onHandleSettlePayment}>
                    SETTLE PAYMENT
                    </Button>
                  )}
                </div>
              )
            }
          </Paper>
        </Center>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  attendee: makeSelectAttendee(),
  success: makeSelectSuccess(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchEvent,
  fetchAttendee,
  attend,
  settlePayment
};

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchEvent(params.id);
});

const withLoadingWhileFetchingData = showLoadingWhileFetchingData((props) => {
  return props.meta.isLoading;
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingData
)(QRScan);
