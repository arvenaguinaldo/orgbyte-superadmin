import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';

// import classNames from 'classnames';
import {createStructuredSelector} from 'reselect';
import fetchInitialData from 'hoc/fetchInitialData';

// redux form
import {Field, reduxForm} from 'redux-form';
import {validate} from 'utils/Validations/VerifyMember';

import {createTextMask} from 'redux-form-input-masks';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';


// actions
import {verifyMember} from 'redux/actions/users';
import {fetchSizes} from 'redux/actions/shirts';
import {makeSelectShirtSizes, makeSelectShirtsMeta} from 'redux/selectors/shirts';
import {makeSelectVerifyMember, makeSelectIsVerified} from 'redux/selectors/users';

// material ui
import Grid from '@material-ui/core/Grid';

import SubmitButton from 'components/SubmitButton/SubmitButton';

import IndividualPurchaseForm from './IndividualPurchaseForm';

import style from './Individual.scss';


class Individual extends Component {
  static propTypes = {
    shirt: PropTypes.object.isRequired,
    verifiedMember: PropTypes.object,
    verifyMember: PropTypes.func,
    handleSubmit: PropTypes.func,
    isVerified: PropTypes.bool,
    shirtSizes: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
  }

  onSubmit = (values) => {
    if (!this.props.meta.isLoading) {
      this.props.verifyMember(values.student_number);
      // dispatch(change('IndividualPurchase', 'shirts_id', this.props.shirt.id));
    }
  };


  render() {
    const {isVerified, verifiedMember, shirtSizes} = this.props;

    const studentNumberMask = createTextMask({
      pattern: '9999-999999',
      placeholder: ' ',
      guide: false
    });

    const {shirt, valid, handleSubmit, meta} = this.props; // eslint-disable-line react/prop-types
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

            <IndividualPurchaseForm shirtSizes={shirtSizes} shirt={shirt} initialValues={verifiedMember} initialValuesToPassThru={verifiedMember} />

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
  shirtSizes: makeSelectShirtSizes(),
  meta: makeSelectShirtsMeta()
});


const mapDispatchToProps = {
  verifyMember,
  fetchSizes
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchSizes();
});

export default compose(
  reduxForm({
    form: 'VerifyMemberForm',
    overwriteOnInitialValuesChange: false,
    validate
  }),
  withRedux,
  withFetchInitialData
)(Individual);
