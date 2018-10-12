import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField, renderDatePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import {validate, warn} from 'utils/EditValidations/Organization';

// Material UI
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  };

  state = {
    selectedDate: new Date()
  };

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
  }

  render() {
    const recognitionNumberMask = createTextMask({
      pattern: '99-999',
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
                    name="name"
                    component={renderTextField}
                    label="Organization Name"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="organization_type_id"
                    component={renderSelectField}
                    label="Type of Organization"
                    fullWidth
                  >
                    <MenuItem value={1}>Univesity Based</MenuItem>
                    <MenuItem value={2}>College Based</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="organization_nature_id"
                    component={renderSelectField}
                    label="Nature of Organiation"
                    fullWidth
                  >
                    <MenuItem value={1}>Academic</MenuItem>
                  </Field>
                </Grid>
              </Grid>

              <Grid container spacing={32}>
                <Grid item xs={6} sm={6} md={2}>
                  <Field
                    name="acronym"
                    component={renderTextField}
                    label="Acronym"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={10} sm={10} md={3}>
                  <Field
                    name="recognition_number"
                    component={renderTextField}
                    label="Recognition Number"
                    fullWidth
                    {...recognitionNumberMask}
                  />
                </Grid>

                <Grid item xs={11} sm={11} md={3}>
                  <Field
                    name="formation"
                    component={renderDatePicker}
                    selected={this.state.selectedDate}
                    label="Date of Formation"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="college_id"
                    component={renderSelectField}
                    label="College"
                    fullWidth
                  >
                    <MenuItem value={1}>College of Information and Communications Technology</MenuItem>
                    <MenuItem value={2}>College of Industrial Technology</MenuItem>
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
  validate,
  warn
})(EditForm);
