import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import classNames from 'classnames';
import QrReader from 'react-qr-reader';
// import PropTypes from 'prop-types';

import Center from 'react-center';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {createStructuredSelector} from 'reselect';
import {makeSelectAttendee, makeSelectSuccess, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchAttendee, attend, settlePayment} from 'redux/actions/events';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
// import SubmitButton from 'components/SubmitButton/SubmitButton';
import styles from './QRScan.scss';

class QRScan extends Component {
  static propTypes = {
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
    delay: 300,
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
      const {match: {params}} = this.props;
      const parameters = {qr_result: data, event_id: params.id};
      console.log(data);
      this.setState({qr_result: data});
      this.props.fetchAttendee(parameters);
    }
  };


  handleError = (err) => {
    console.error(err);
  };
  render() {
    const {attendee, success, meta} = this.props;

    const buttonClassname = classNames({
      [styles.buttonSuccess]: success && attendee.attendance
    });
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" color="secondary"> QR Scanner</Typography>
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
                      <Typography variant="h4" color="secondary">Attendee Details</Typography>
                      { Object.keys(attendee).length === 0 ? (
                        <Center>
                          <div className={styles.InstructionsDiv}>
                            <Typography variant="h5" color="secondary">Please scan your qr code.</Typography>
                          </div>
                        </Center>
                      ) : (
                        <div className={styles.AttendeeDetailsDiv}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={2}>
                              <Typography variant="h6" color="secondary">Name:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                              <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.last_name + ', ' + attendee.first_name + ' ' + attendee.middle_name}</Typography>
                            </Grid>
                          </Grid>

                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={4}>
                              <Typography variant="h6" color="secondary">Attendee Type:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.event_attendee_type_name}</Typography>
                            </Grid>
                          </Grid>

                          {attendee.student_number &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h6" color="secondary">Student Number:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={8}>
                                <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.student_number}</Typography>
                              </Grid>
                            </Grid>
                          }

                          {attendee.college_name &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={2}>
                                <Typography variant="h6" color="secondary">College:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={10}>
                                <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.college_name}</Typography>
                              </Grid>
                            </Grid>
                          }

                          {attendee.course_name &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={2}>
                                <Typography variant="h6" color="secondary">Course:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={10}>
                                <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.course_name}</Typography>
                              </Grid>
                            </Grid>
                          }

                          {attendee.year_level &&
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h6" color="secondary">Year/Section/Group:</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={7}>
                                <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.year_level + attendee.section + ' - G' + attendee.group}</Typography>
                              </Grid>
                            </Grid>
                          }

                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={2}>
                              <Typography variant="h6" color="secondary">Email:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                              <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.email}</Typography>
                            </Grid>
                          </Grid>

                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={4}>
                              <Typography variant="h6" color="secondary">Payment Status:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <Typography variant="body1" color="secondary" className={styles.AttendeeDetail}>{attendee.payment_status === true ? 'PAID' : 'NOT PAID'}</Typography>
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

            <div className={styles.submitButtonDiv}>
              {attendee.payment_status === true ? (
                <Button className={buttonClassname} color="primary" variant="contained" onClick={this.onHandleCheckIn}>
                  {success && attendee.attendance ? 'ATTENDED' : 'ATTEND'}
                </Button>
              ) : (
                <Button color="primary" variant="contained" onClick={this.onHandleSettlePayment}>
                    SETTLE PAYMENT
                </Button>
              )}
            </div>
          </Paper>
        </Center>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  attendee: makeSelectAttendee(),
  success: makeSelectSuccess(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchAttendee,
  attend,
  settlePayment
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRedux,
)(QRScan);
