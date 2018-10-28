import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createTextMask} from 'redux-form-input-masks';

import {purchaseShirt} from 'redux/actions/shirts';
import {fetchCourses} from 'redux/actions/courses';

import {makeSelectShirtsMeta} from 'redux/selectors/shirts';
import {makeSelectVerifyMember} from 'redux/selectors/users';

import {makeSelectCoursesList} from 'redux/selectors/courses';

import fetchInitialData from 'hoc/fetchInitialData';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import style from './Individual.scss';

class IndividualPurchaseForm extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired,
    shirt: PropTypes.object.isRequired,
    verifiedMember: PropTypes.object,
    shirtSizes: PropTypes.object,
    meta: PropTypes.object.isRequired
  };

  onSubmit = (values, dispatch) => {
    const {shirt} = this.props;
    _.set(values, 'shirt_id', shirt.id);
    _.set(values, 'member_id', values.id);
    dispatch(purchaseShirt(values));
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

    const required = value => (value ? undefined : 'This field is Required');

    const {courses, valid, handleSubmit, verifiedMember, shirtSizes, meta} = this.props; // eslint-disable-line react/prop-types
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid container spacing={32}>
          <Grid item xs={6} sm={6} md={2}>
            <Field
              name="size"
              component={renderSelectField}
              label="Size"
              validate={required}
              fullWidth
            >
              <option value="" />
              {shirtSizes.xxsmall && <option value={'XXS'}>XXS</option>}
              {shirtSizes.xsmall && <option value={'XS'}>XS</option>}
              {shirtSizes.small && <option value={'S'}>S</option>}
              {shirtSizes.medium && <option value={'M'}>M</option>}
              {shirtSizes.large && <option value={'L'}>L</option>}
              {shirtSizes.xlarge && <option value={'XL'}>XL</option>}
              {shirtSizes.xxlarge && <option value={'2XL'}>2XL</option>}
              {shirtSizes.xxxlarge && <option value={'3XL'}>3XL</option>}
              {shirtSizes.xxxxlarge && <option value={'4XL'}>4XL</option>}
            </Field>
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <Field
              name="last_name"
              component={renderTextField}
              label="Last Name"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Field
              name="first_name"
              component={renderTextField}
              label="First Name"
              fullWidth
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Field
              name="middle_name"
              component={renderTextField}
              label="Middle Name"
              fullWidth
              readOnly
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
              readOnly
            />
          </Grid>

          <Grid item xs={6} sm={12} md={3}>
            <Field
              name="contact_number"
              component={renderTextField}
              label="Contact Number"
              fullWidth
              readOnly
              {...contactNumberMask}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Field
              name="address"
              component={renderTextField}
              label="Address"
              fullWidth
              readOnly
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
              readOnly
            >
              <option value="" />
              <option value={1}>First Year</option>
              <option value={2}>Second Year</option>
              <option value={3}>Third Year</option>
              <option value={4}>Fourth Year</option>
            </Field>
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <Field
              name="section"
              component={renderTextField}
              label="Section"
              fullWidth
              readOnly
              {...sectionMask}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <Field
              name="group"
              component={renderTextField}
              label="Group"
              fullWidth
              readOnly
              {...groupNumberMask}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <Field
              name="course_id"
              component={renderSelectField}
              label="Course"
              fullWidth
              readOnly
            >
              <option value="" />
              {courses.map((course) => {
                return (
                  <option key={course.id} value={course.id}> {course.course_name} </option>
                );
              })}
            </Field>
          </Grid>
        </Grid>

        <div className={style.bottomButton}>
          <Button component={Link} to="/memberships" color="primary" className={style.button}>
                  Cancel
          </Button>

          <SubmitButton loading={meta.isLoading} valid={!valid || !verifiedMember}>
                  Purchase
          </SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  courses: makeSelectCoursesList(),
  verifiedMember: makeSelectVerifyMember(),
  meta: makeSelectShirtsMeta()
});

const withRedux = connect(mapStateToProps, {fetchCourses});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchCourses();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'IndividualPurchase',
    overwriteOnInitialValuesChange: true,
    enableReinitialize: true,
    destroyOnUnmount: false
  })
)(IndividualPurchaseForm);
