import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {connect} from 'react-redux';


import {makeSelectCoursesMeta} from 'redux/selectors/courses';
import {fetchColleges} from 'redux/actions/colleges';
import {makeSelectCollegesList} from 'redux/selectors/colleges';
import fetchInitialData from 'hoc/fetchInitialData';

import {validate} from 'utils/Validations/AddCourse';

// Material UI
import Grid from '@material-ui/core/Grid';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    colleges: PropTypes.array.isRequired
  };

  state = {
    selectedDate: new Date()
  };

  render() {

    const {handleSubmit, colleges} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={32}>
                <Grid item xs={12} sm={12} md={12}>
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

                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    name="name"
                    component={renderTextField}
                    label="Course Name"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    name="course_code"
                    component={renderTextField}
                    label="Course Code"
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
  colleges: makeSelectCollegesList(),
  meta: makeSelectCoursesMeta()
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
    validate
  })
)(EditForm);
