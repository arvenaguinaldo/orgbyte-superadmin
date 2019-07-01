import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {renderDateTimePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import moment from 'moment';
import {compose} from 'recompose';
import {Field, reduxForm} from 'redux-form';
import Center from 'react-center';

import {setRenewal} from 'redux/actions/renewal';
import {makeSelectRenewalMeta} from 'redux/selectors/renewal';

import {validate} from 'utils/Validations/Renewal';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './RenewalDate.scss';

class RenewalDate extends Component {
    state = {
      startsDate: new Date('2018-01-01T00:00:00.000Z'),
      endsDate: new Date()
    };

    onSubmit = (values, dispatch) => {
      dispatch(setRenewal(values));
    };

    handleStartsDateChange = (date) => {
      this.setState({startsDate: date});
    }

    handleEndsDateChange = (date) => {
      this.setState({endsDate: date});
    }

    render() {
      moment.locale('en');

      const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
      return (
        <LayoutWithTopbarAndSidebar>
          <Center>
            <div>
              <Typography variant="h4" gutterBottom>
                Renewal Period
              </Typography>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={9}>
                    <Paper className={styles.Paper}>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12}>
                          <Field
                            name="starts"
                            component={renderDateTimePicker}
                            label="Date Starts"
                            selected={this.state.startsDate}
                            onChange={this.handleStartsDateChange}
                            disablePast
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Field
                            name="ends"
                            component={renderDateTimePicker}
                            label="Date Ends"
                            selected={this.state.endsDate}
                            minDate={moment(this.state.startsDate).format('YYYY-MM-DD')}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={9} />
                            <Grid item xs={12} sm={12} md={3}>
                              <SubmitButton loading={meta.isLoading} valid={!valid}> {/* eslint-disable-line */}
                                SUBMIT
                              </SubmitButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Center>
        </LayoutWithTopbarAndSidebar>
      );
    }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectRenewalMeta()
});

// const mapDispatchToProps = {

// };

const withRedux = connect(mapStateToProps, {setRenewal});

export default compose(
  withRedux,
  reduxForm({
    form: 'RenewalDateForm',
    destroyOnUnmount: false,
    validate
  }),
)(RenewalDate);

