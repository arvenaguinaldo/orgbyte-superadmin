import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

// Material UI
import Grid from '@material-ui/core/Grid';
import fetchInitialData from 'hoc/fetchInitialData';

import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {connect} from 'react-redux';

import {fetchColleges} from 'redux/actions/colleges';
import {makeSelectCollegesList} from 'redux/selectors/colleges';

import {validate, warn} from 'utils/Validations/AddAccount';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    colleges: PropTypes.array.isRequired
  };

  state = {
    selectedDate: new Date()
  };

  render() {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    const {handleSubmit, colleges} = this.props;
    console.log(this.props.colleges);

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
                    {colleges.map((college) => {
                      return (
                        <option key={college.id} value={college.id}> {college.name} </option>
                      );
                    })}
                  </Field>
                </Grid>

                <Grid item xs={10} sm={10} md={4}>
                  <Field
                    name="position"
                    component={renderTextField}
                    label="Position"
                    fullWidth
                  />
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  colleges: makeSelectCollegesList()
});

const mapDispatchToProps = {
  fetchColleges
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchColleges();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'EditForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate,
    warn
  })
)(EditForm);
