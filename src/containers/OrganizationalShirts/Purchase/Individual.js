import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {createStructuredSelector} from 'reselect';
import {makeSelectVerifyMember, makeSelectIsVerified, makeSelectShirtsMeta} from 'redux/selectors/shirts';
// redux form
import {Field, reduxForm} from 'redux-form';

import {createTextMask} from 'redux-form-input-masks';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {verifyMember} from 'redux/actions/shirts';

// material ui
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

import {validate} from 'utils/Validations/VerifyMember';

import IndividualPurchaseForm from './IndividualPurchaseForm';

const styles = ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    marginTop: 25,
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -52
  }
});

class Individual extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
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

    const {classes, isVerified} = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: isVerified
    });

    const studentNumberMask = createTextMask({
      pattern: '9999-999999',
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
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={buttonClassname}
                      disabled={meta.isLoading || !valid}
                      type="submit"
                    >
                    Verify Member
                    </Button>
                    {meta.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </Grid>
              </Grid>
            </form>

            <IndividualPurchaseForm initialValues={this.props.verifiedMember} initialValuesToPassThru={this.props.verifiedMember} />

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
  meta: makeSelectShirtsMeta()
});


const mapDispatchToProps = {
  verifyMember
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  reduxForm({
    form: 'PurchaseIndividual',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    validate
  }),
  withRedux,
  withStyles(styles)
)(Individual);
