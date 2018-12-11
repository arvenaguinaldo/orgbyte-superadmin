import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';

// import classNames from 'classnames';
import {createStructuredSelector} from 'reselect';

// redux form
import {Field, reduxForm} from 'redux-form';
import {validate} from 'utils/Validations/VerifyMember';

import {createTextMask} from 'redux-form-input-masks';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';


// actions
import {verifyMember} from 'redux/actions/users';
import {makeSelectVerifyMember, makeSelectIsVerified} from 'redux/selectors/users';
import {makeSelectUsersMeta} from 'redux/selectors/users';

// material ui
import Grid from '@material-ui/core/Grid';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import MemberForm from './MemberForm';

import style from './Register.scss';


class Member extends Component {
  static propTypes = {
    event: PropTypes.object,
    verifiedMember: PropTypes.object,
    verifyMember: PropTypes.func,
    handleSubmit: PropTypes.func,
    isVerified: PropTypes.bool,
    meta: PropTypes.object.isRequired
  }

  onSubmit = (values) => {
    if (!this.props.meta.isLoading) {
      this.props.verifyMember(values.student_number);
    }
  };

  render() {
    const {isVerified, verifiedMember, event} = this.props;

    const studentNumberMask = createTextMask({
      pattern: '9999999999',
      placeholder: ' ',
      guide: false
    });

    const {valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12}>

            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Grid container spacing={32}>
                <Grid item xs={12} sm={12} md={2}>
                  <Field
                    name="student_number"
                    component={renderTextField}
                    label="Student Number"
                    fullWidth
                    {...studentNumberMask}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <SubmitButton className={style.verifyMember} loading={meta.isVerifyMemberLoading} valid={!valid} success={isVerified}>
                    Verify Member
                  </SubmitButton>
                </Grid>
              </Grid>
            </form>

            <MemberForm event={event} initialValues={verifiedMember} initialValuesToPassThru={verifiedMember} />

          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  verifiedMember: makeSelectVerifyMember(),
  isVerified: makeSelectIsVerified(),
  initialValues: makeSelectVerifyMember(),
  meta: makeSelectUsersMeta()
});


const mapDispatchToProps = {
  verifyMember
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  reduxForm({
    form: 'VerifyMemberForm',
    overwriteOnInitialValuesChange: false,
    enableReinitialize: true,
    validate
  }),
  withRedux
)(Member);
