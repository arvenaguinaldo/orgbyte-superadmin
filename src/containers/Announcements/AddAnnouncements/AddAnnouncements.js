import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AttechmentIcon from '@material-ui/icons/Attachment';
import Paper from '@material-ui/core/Paper';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {renderTextField, renderDatePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import Typography from '@material-ui/core/Typography';
import myStyles from './Announcements.scss';

const styles = theme => ({
  root: {
    width: '100%'
  },
  Paper: {
    padding: '50px'
  },
  sendButton: {
    flex: 1
  },
  grid: {
    backgroundColor: '#5F1D24'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  button: {
    margin: 20
  }
});

class AddAnnouncements extends Component {
    static propTypes = {
      classes: PropTypes.object
    };
    state = {
      selectedDate: new Date()
    }
    render() {
      const {classes} = this.props;
      const moment = require('moment');
      const currentDate = moment().format('YYYY-MM-DD');
      return (

        <LayoutWithTopbarAndSidebar>
          <Typography variant="h4" gutterBottom>Announcements</Typography>
          <Paper className={myStyles.Paper}>
            <form>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12}>

                  <Grid container spacing={40}>

                    <Grid item xs={10} sm={10} md={6} >
                      <Field
                        name="subject"
                        component={renderTextField}
                        label="Subject"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={10} sm={10} md={3} >
                      <Field
                        name="date_start"
                        component={renderDatePicker}
                        selected={this.state.selectedDate}
                        label="Date of posting"
                        fullWidth
                        minDate={currentDate}
                        minDateMessage="Date should not be after minimum date"
                      />
                    </Grid>
                    <Grid item xs={10} sm={10} md={3} >
                      <Field
                        name="date_end"
                        component={renderDatePicker}
                        selected={this.state.selectedDate}
                        label="Expiration"
                        fullWidth
                        minDate={currentDate}
                        minDateMessage="Date should not be after minimum date"
                      />
                    </Grid>
                  </Grid>

                  <Button size="small" variant="contained" color="primary">
                    <AttechmentIcon className={classNames(classes.leftIcon, classes.iconSmall)} /> Add attachment
                  </Button>


                  <Grid container spacing={40}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Field
                        name="content"
                        component={renderTextField}
                        label="Message"
                        fullWidth
                        multiline
                        rows="13"
                      />
                    </Grid>
                  </Grid>
                  <div className={myStyles.actionsDiv}>
                    <Button size="small" variant="contained" color="primary">
                      Post
                    </Button>
                  </div>

                </Grid>
              </Grid>
            </form>
          </Paper>
          <div />
        </LayoutWithTopbarAndSidebar>
      );
    }
}

export default compose(
  reduxForm({
    form: 'AnnouncementsForm',
    destroyOnUnmount: false
  }, null),
  withStyles(styles)
)(AddAnnouncements);
