import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

// Material UI
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import {validate, warn} from 'utils/EditValidations/Presidents';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  };

  state = {
    selectedDate: new Date()
  };

  render() {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    const {handleSubmit} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>
                <Grid item xs={10} sm={10} md={4}>
                  <Field
                    name="last_name"
                    component={renderTextField}
                    label="Last Name"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={10} sm={10} md={4}>
                  <Field
                    name="first_name"
                    component={renderTextField}
                    label="First Name"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={10} sm={10} md={4}>
                  <Field
                    name="middle_name"
                    component={renderTextField}
                    label="Middle Name"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={32}>
                <Grid item xs={10} sm={10} md={4}>
                  <Field
                    name="email"
                    component={renderTextField}
                    label="Email"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} sm={12} md={4}>
                  <Field
                    name="contact_number"
                    component={renderTextField}
                    label="Contact Number"
                    fullWidth
                    {...contactNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="college_id"
                    component={renderSelectField}
                    label="college"
                    fullWidth
                  >
                  <option value="" />
                  {this.props.colleges.map((college) => {
                    return (
                      <option key={college.id} value={college.id}> {college.name} </option>
                    );
                  })}
                  </Field>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'EditForm',
  overwriteOnInitialValuesChange: true,
  destroyOnUnmount: false,
  enableReinitialize: true,
  validate,
  warn
})(EditForm);
