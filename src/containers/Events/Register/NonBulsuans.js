import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {createStructuredSelector} from 'reselect';

import {Field, reduxForm} from 'redux-form';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createTextMask} from 'redux-form-input-masks';

import {register} from 'redux/actions/events';

import {makeSelectEventsMeta} from 'redux/selectors/events';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import style from './Register.scss';

class NonBulsuans extends Component {
  static propTypes = {
    event: PropTypes.object,
    meta: PropTypes.object.isRequired
  }

  onSubmit = (values, dispatch) => {
    _.set(values, 'event_id', this.props.event.id);
    dispatch(register(values));
  };

  render() {
    const contactNumberMask = createTextMask({
      pattern: '+63 (999) 999-9999',
      placeholder: ' '
    });

    const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
    const registerDisable = moment().isAfter(this.props.event.ends);
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid container spacing={32}>
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
        </Grid>

        <div className={style.bottomButton}>
          <Button component={Link} to={'/events/'} color="primary" className={style.button}>
                  Cancel
          </Button>

          <SubmitButton loading={meta.isLoadingSubmit} valid={!valid || registerDisable}>
                  Register
          </SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectEventsMeta()
});

const withRedux = connect(mapStateToProps, null);

export default compose(
  withRedux,
  reduxForm({
    form: 'EventRegisterForm',
    overwriteOnInitialValuesChange: true,
    enableReinitialize: true,
    destroyOnUnmount: false,
    initialValues: {
      event_attendee_type_id: 3
    }
  })
)(NonBulsuans);
