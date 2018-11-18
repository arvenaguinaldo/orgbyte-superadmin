import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {compose} from 'recompose';
import {createTextMask} from 'redux-form-input-masks';
import {fetchSizes} from 'redux/actions/shirts';
import {connect} from 'react-redux';
import fetchInitialData from 'hoc/fetchInitialData';

import {createStructuredSelector} from 'reselect';
import {makeSelectShirtSizes} from 'redux/selectors/shirts';


// Material UI
import Grid from '@material-ui/core/Grid';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    shirtSizes: PropTypes.object
  };

  state = {
    selectedDate: new Date()
  };


  render() {
    const groupNumberMask = createTextMask({
      pattern: 'G-9',
      placeholder: ' '
    });
    const sectionMask = createTextMask({
      pattern: 'A',
      placeholder: ' '
    });
    const {handleSubmit, shirtSizes} = this.props;
    const required = value => (value ? undefined : 'This field is Required');
    return (
      <div>
        <form onSubmit={handleSubmit}>
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

          <Grid container spacing={24} />

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
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  shirtSizes: makeSelectShirtSizes()
});

const mapDispatchToProps = {
  fetchSizes
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchSizes();
});

export default compose(
  reduxForm({
    form: 'EditForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    enableReinitialize: true
  }),
  withRedux,
  withFetchInitialData,
)(EditForm);
