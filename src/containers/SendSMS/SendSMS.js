import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {renderSelectField, renderTextField, renderCheckbox, renderChipPhoneNumber} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import {createSms} from 'redux/actions/sms';
import {makeSelectSmssMeta} from 'redux/selectors/sms';

import {validate} from 'utils/Validations/SendSMS';


import SubmitButton from 'components/SubmitButton/SubmitButton';
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

class SendSMS extends Component {
  static propTypes = {
    onPaste: PropTypes.func,
    meta: PropTypes.object
  }
  state = {
    chips: []
  };

  onSubmit = (values, dispatch) => {
    dispatch(createSms(values));
  };

  onBeforeAdd = () => {
    return true;
  }
  handleAdd = (...chips) => {
    this.setState({
      chips: [...this.state.chips, ...chips]
    });
  }
  handleDelete = (deletedChip) => {
    this.setState({
      chips: this.state.chips.filter(c => c !== deletedChip)
    });
  }
  render() {
    const checkboxLabel = [
      {label: 'All Members', name: 'all_members'},
      {label: '1st year', name: 'first_year'},
      {label: '2nd year', name: 'second_year'},
      {label: '3rd year', name: 'third_year'},
      {label: '4th year', name: 'fourth_year'}
    ];

    const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
    return (

      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>SMS</Typography>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Paper className={myStyles.Paper}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12}>

                <Grid container spacing={40}>
                  <Grid item xs={10} sm={10} md={6}>
                    <Field
                      name="subject"
                      component={renderTextField}
                      label="Subject"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={3} >
                    <Field
                      name="email_type"
                      component={renderSelectField}
                      label="Type of Message"
                      fullWidth
                    >
                      <option value="" />
                      <option value="ANNOUNCEMENT">Announcements</option>
                      <option value="INVITATION">Invitations</option>
                      <option value="REMINDER">Reminder</option>
                    </Field>
                  </Grid>
                </Grid>
                <Grid container spacing={40}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid item xs={12} sm={12} md={11}>
                      <Field
                        name="recipients"
                        value={this.state.chips}
                        onPaste={(event) => {
                          const clipboardText = event.clipboardData.getData('Text');
                          event.preventDefault();
                          this.handleAdd(...clipboardText.split('\n').filter(t => t.length > 0));
                          if (this.props.onPaste) {
                            this.props.onPaste(event);
                          }
                        }}
                        onAdd={chip => this.handleAddChip(chip)}
                        onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                        label="Recipients"
                        helper="Enter a valid phone number and not starting with 0 and press Enter"
                        component={renderChipPhoneNumber}
                        fullWidth
                        onBeforeAdd={chip => this.onBeforeAdd(chip)}
                      />
                    </Grid>
                    <div className={myStyles.Contacts}>
                      <Typography variant="body1">Contacts</Typography>
                      {checkboxLabel.map(option => (
                        <Field
                          key={option.name}
                          name={option.name}
                          component={renderCheckbox}
                          label={option.label}
                        />
                      ))}
                    </div>
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
                      rows="11"
                    />
                  </Grid>
                </Grid>
                <div className={myStyles.actionsDiv}>
                  <Button size="small" color="secondary" className={myStyles.actionsButton}>
                      Cancel
                  </Button>
                  <SubmitButton loading={meta.isLoading} valid={!valid}>
                    SEND
                  </SubmitButton>
                </div>

              </Grid>
            </Grid>
          </Paper>
        </form>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectSmssMeta()
});

const withRedux = connect(mapStateToProps, {createSms});

export default compose(
  withRedux,
  reduxForm({
    form: 'SmsForm',
    destroyOnUnmount: false,
    validate
  }),
  withStyles(styles)
)(SendSMS);
