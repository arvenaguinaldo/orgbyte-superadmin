import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {createTextMask} from 'redux-form-input-masks';
import {renderTextField, renderSelectField, renderDatePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {connect} from 'react-redux';


import {makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {makeSelectOrganizationNaturesList} from 'redux/selectors/organization_natures';
import {fetchColleges} from 'redux/actions/colleges';
import {makeSelectCollegesList} from 'redux/selectors/colleges';
import {fetchOrganizationNatures} from 'redux/actions/organization_natures';
import fetchInitialData from 'hoc/fetchInitialData';

import {validate, warn} from 'utils/EditValidations/Organization';

// Material UI
import Grid from '@material-ui/core/Grid';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    colleges: PropTypes.array.isRequired,
    organizationNatures: PropTypes.array.isRequired
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

    const {handleSubmit, colleges, organizationNatures} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>
                <Grid item xs={10} sm={10} md={8}>
                  <Field
                    name="name"
                    component={renderTextField}
                    label="Organization Name"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Field
                    name="organization_nature_id"
                    component={renderSelectField}
                    label="Nature of Organiation"
                    fullWidth
                  >
                    <option value="" />
                    {organizationNatures.map((nature) => {
                      return (
                        <option key={nature.id} value={nature.id}> {nature.name} </option>
                      );
                    })}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={5}>
                  <Field
                    name="organization_type_id"
                    component={renderSelectField}
                    label="Type of Organization"
                    fullWidth
                  >
                    <option value="" />
                    <option value={1}>Univesity Based</option>
                    <option value={2}>College Based</option>
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={7}>
                  <Field
                    name="college_id"
                    component={renderSelectField}
                    label="College"
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

              </Grid>

              <Grid container spacing={32}>
                <Grid item xs={6} sm={6} md={4}>
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

                <Grid item xs={11} sm={11} md={5}>
                  <Field
                    name="formation"
                    component={renderDatePicker}
                    selected={this.state.selectedDate}
                    label="Date of Formation"
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
  organizationNatures: makeSelectOrganizationNaturesList(),
  colleges: makeSelectCollegesList(),
  meta: makeSelectOrganizationsMeta()
});

const mapDispatchToProps = {
  fetchColleges,
  fetchOrganizationNatures
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOrganizationNatures();
  props.fetchColleges();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'EditForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    validate,
    warn
  })
)(EditForm);
