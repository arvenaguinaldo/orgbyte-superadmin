import React, {Component} from 'react';

// redux form
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField, renderRadioButton} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {addMember} from 'redux/actions/users';

// material ui
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import {validate} from 'utils/Validations/AddMemberIndividual';

import style from './Individual.scss';

class Individual extends Component {

  onSubmit = (values, dispatch) => {
    console.log(values);
    dispatch(addMember(values));
  };

  render() {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    const groupNumberMask = createTextMask({
      pattern: 'G-9',
      placeholder: ' '
    });
    const sectionMask = createTextMask({
      pattern: 'A',
      placeholder: ' '
    });
    const studentNumberMask = createTextMask({
      pattern: '9999-999999',
      placeholder: ' ',
      guide: false
    });

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={32}>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="student_number"
                    component={renderTextField}
                    label="Student Number"
                    fullWidth
                    {...studentNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="last_name"
                    component={renderTextField}
                    label="Last Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Field
                    name="first_name"
                    component={renderTextField}
                    label="First Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
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
              </Grid>

              <Grid container spacing={32}>
                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    name="year_level"
                    component={renderSelectField}
                    label="Year Level"
                    fullWidth
                  >
                    <MenuItem value={1}>First Year</MenuItem>
                    <MenuItem value={2}>Second Year</MenuItem>
                    <MenuItem value={3}>Third Year</MenuItem>
                    <MenuItem value={4}>Fourth Year</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    name="section"
                    component={renderTextField}
                    label="Section"
                    fullWidth
                    {...sectionMask}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    name="group"
                    component={renderTextField}
                    label="Group"
                    fullWidth
                    {...groupNumberMask}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <Field
                    name="major_id"
                    component={renderSelectField}
                    label="Major"
                    fullWidth
                  >
                    <MenuItem value={2}>Bachelor of Science in Information Technology</MenuItem>
                  </Field>
                </Grid>
              </Grid>

              <Grid container spacing={32}>
                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="semester"
                    component={renderRadioButton}
                    label="Semester"
                    fullWidth
                  >
                    <FormControlLabel value="1" control={<Radio color="primary" />} label="1st Semester" />
                    <FormControlLabel value="2" control={<Radio color="primary" />} label="2nd Semester" />
                  </Field>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          <div className={style.bottomButton}>
            <Button component={Link} to="/memberships" color="primary" className={style.button}>
              Cancel
            </Button>

            <Button variant="raised" color="primary" type="submit" className={style.button} disabled={!valid}>
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
}, null, {addMember}
)(Individual);
