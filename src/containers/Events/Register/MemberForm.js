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

import {register} from 'redux/actions/events';

import {makeSelectSuccess, makeSelectEventsMeta} from 'redux/selectors/events';
import {makeSelectVerifyMember} from 'redux/selectors/users';

import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import style from './Register.scss';

class MemberForm extends Component {
  static propTypes = {
    event: PropTypes.object,
    verifiedMember: PropTypes.object,
    sucess: PropTypes.bool,
    meta: PropTypes.object.isRequired
  }

  onSubmit = (values, dispatch) => {
    _.set(values, 'event_id', this.props.event.id);
    _.set(values, 'event_attendee_type_id', 1);
    dispatch(register(values));
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

    const {valid, handleSubmit, verifiedMember, success, meta} = this.props; // eslint-disable-line react/prop-types
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid container spacing={32}>
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

          <Grid item xs={12} sm={12} md={3}>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              fullWidth
              readOnly
            />
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={6} sm={12} md={2}>
            <Field
              name="contact_number"
              component={renderTextField}
              label="Contact Number"
              fullWidth
              readOnly
              {...contactNumberMask}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <Field
              name="year_level"
              component={renderSelectField}
              label="Year Level"
              fullWidth
              readOnly
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

          <Grid item xs={6} sm={6} md={4}>
            <Field
              name="major_id"
              component={renderSelectField}
              label="Major"
              fullWidth
              readOnly
            >
              <MenuItem value={2}>Bachelor of Science in Information Technology</MenuItem>
            </Field>
          </Grid>
        </Grid>

        <div className={style.bottomButton}>
          <Button component={Link} to={'/events/'} color="primary" className={style.button}>
                  Cancel
          </Button>

          <SubmitButton loading={meta.isLoadingSubmit} valid={!valid || !verifiedMember} success={success}>
                  Register
          </SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  verifiedMember: makeSelectVerifyMember(),
  meta: makeSelectEventsMeta()
});

const withRedux = connect(mapStateToProps, {register});

export default compose(
  withRedux,
  reduxForm({
    form: 'EventRegisterForm',
    overwriteOnInitialValuesChange: true,
    enableReinitialize: true,
    destroyOnUnmount: false
  })
)(MemberForm);
