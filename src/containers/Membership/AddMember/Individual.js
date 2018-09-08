import React, {Component} from 'react';

// redux form
import {Field, reduxForm} from 'redux-form';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField, renderRadioButton} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

// material ui
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import {validate} from 'utils/AddMemberIndividualValidations';

import style from './Individual.scss';

export class Individual extends Component {
  render() {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="last_name"
                    component={renderTextField}
                    label="Last Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="first_name"
                    component={renderTextField}
                    label="First Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="middle_name"
                    component={renderTextField}
                    label="Middle Name"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="email"
                    component={renderTextField}
                    label="Email"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} sm={12} md={3}>
                  <Field
                    name="contact_number"
                    component={renderTextField}
                    label="Contact Number"
                    fullWidth
                    {...contactNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field
                    name="address"
                    component={renderTextField}
                    label="Address"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                  <Field
                    name="year_level"
                    component={renderSelectField}
                    label="Year Level"
                    fullWidth
                  >
                    <MenuItem value={1}>FIRST YEAR</MenuItem>
                    <MenuItem value={2}>SECOND YEAR</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                  <Field
                    name="section"
                    component={renderTextField}
                    label="Section"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                  <Field
                    name="group"
                    component={renderTextField}
                    label="Group"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field
                    name="major"
                    component={renderSelectField}
                    label="Major"
                    fullWidth
                  >
                    <MenuItem value={1}>Bachelor of Science in Information Technology</MenuItem>
                    <MenuItem value={2}>Computer Technology</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="semester"
                    component={renderRadioButton}
                    label="Semester"
                    fullWidth
                  >
                    <FormControlLabel value="firstSem" control={<Radio />} label="1st Semester" />
                    <FormControlLabel value="secondSem" control={<Radio />} label="2nd Semester" />
                  </Field>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
          <div className={style.bottomButton}>
            <Button variant="raised" color="primary" type="submit" disabled={!valid}>
            Add a member
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'AddMember',
  destroyOnUnmount: false,
  validate
})(Individual);
