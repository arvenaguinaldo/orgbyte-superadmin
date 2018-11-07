import React, {Component} from 'react';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {renderDateTimePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import SubmitButton from 'components/SubmitButton/SubmitButton';
import moment from 'moment';
import {compose} from 'recompose';
import {Field, reduxForm} from 'redux-form';
import Center from 'react-center';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './RenewalDate.scss';

class RenewalDate extends Component {
    state = {
      startsDate: new Date('2018-01-01T00:00:00.000Z'),
      endsDate: new Date(),
      selectedDate: new Date()
    };

    render() {
      moment.locale('en');
      return (
        <LayoutWithTopbarAndSidebar>
          <Center>
            <div>
              <Typography variant="h4" gutterBottom>
                Renewal Period
              </Typography>
              <form>
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
                              <SubmitButton>
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

export default compose(
  reduxForm({
    form: 'RenewalDate',
    destroyOnUnmount: false
  }),
)(RenewalDate);

