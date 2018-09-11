import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {renderSelectField, renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {Typography} from '../../../node_modules/@material-ui/core';
import myStyles from './SendSMS.scss';

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
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  grid: {
    backgroundColor: '#5F1D24'
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class Email extends Component {
  render() {
    return (

      <LayoutWithTopbarAndSidebar>
        <Paper className={myStyles.Paper}>
          <Typography variant="display1" color="primary" gutterBottom>SMS</Typography>
          <form>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12}>

                <Grid container spacing={40}>

                  <Grid item xs={10} sm={10} md={5} >
                    <Field
                      name="message_type_id"
                      component={renderSelectField}
                      label="Type of Message"
                      fullWidth
                    >
                      <MenuItem value={1}>Announcement</MenuItem>
                      <MenuItem value={2}>Invitations</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={10} sm={10} md={5}>
                    <Field
                      name="sender"
                      component={renderTextField}
                      label="Sender"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={40}>

                  <Grid item xs={10} sm={10} md={5}>
                    <Field
                      name="subject"
                      component={renderTextField}
                      label="Subject"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={5}>
                    <Field
                      name="recipients"
                      component={renderSelectField}
                      label="Recipients"
                      fullWidth
                    >
                      <MenuItem value={1}>1st Year</MenuItem>
                      <MenuItem value={2}>2nd Year</MenuItem>
                    </Field>
                  </Grid>
                </Grid>
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="content"
                      component={renderTextField}
                      label="Message"
                      fullWidth
                      multiline
                      rows="15"
                    />
                  </Grid>
                </Grid>

                <div className={myStyles.actionsDiv}>
                  <Button size="small" variant="contained" color="secondary" className={myStyles.actionsButton}>
                      Cancel
                  </Button>
                  <Button size="small" variant="contained" color="primary">
                      Send
                  </Button>
                </div>

              </Grid>
            </Grid>
          </form>
        </Paper>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

export default compose(
  reduxForm({
    form: 'EmailForm',
    destroyOnUnmount: false
  }, null),
  withStyles(styles)
)(Email);
