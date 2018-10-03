import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createTextMask} from 'redux-form-input-masks';

import {Field, reduxForm, change} from 'redux-form';
import {purchaseShirt} from 'redux/actions/shirts';

import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import style from './Individual.scss';

class IndividualPurchaseForm extends Component {
  static propTypes = {
    shirt: PropTypes.object.isRequired,
    shirtSizes: PropTypes.array
  }

  componentDidMount() {
    this.props.dispatch(change('IndividualPurchase', 'shirts_id', this.props.shirt.id)); // eslint-disable-line react/prop-types
  }

  onSubmit = (values, dispatch) => {
    dispatch(change('IndividualPurchase', 'shirts_id', this.props.shirt.id));
    console.log(values);
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

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types
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
              <MenuItem value={'XXS'}>XXS</MenuItem>
              <MenuItem value={'XS'}>XS</MenuItem>
              <MenuItem value={'S'}>S</MenuItem>
              <MenuItem value={'M'}>M</MenuItem>
              <MenuItem value={'L'}>L</MenuItem>
              <MenuItem value={'XL'}>XL</MenuItem>
              <MenuItem value={'2XL'}>2XL</MenuItem>
              <MenuItem value={'3XL'}>3XL</MenuItem>
              <MenuItem value={'4XL'}>4XL</MenuItem>
            </Field>
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <Field
              name="last_name"
              component={renderTextField}
              label="Last Name"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Field
              name="first_name"
              component={renderTextField}
              label="First Name"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Field
              name="middle_name"
              component={renderTextField}
              label="Middle Name"
              fullWidth
              disabled
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
              disabled
            />
          </Grid>

          <Grid item xs={6} sm={12} md={3}>
            <Field
              name="contact_number"
              component={renderTextField}
              label="Contact Number"
              fullWidth
              disabled
              {...contactNumberMask}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Field
              name="address"
              component={renderTextField}
              label="Address"
              fullWidth
              disabled
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
              disabled
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
              disabled
              {...sectionMask}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <Field
              name="group"
              component={renderTextField}
              label="Group"
              fullWidth
              disabled
              {...groupNumberMask}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <Field
              name="major_id"
              component={renderSelectField}
              label="Major"
              fullWidth
              disabled
            >
              <MenuItem value={2}>Bachelor of Science in Information Technology</MenuItem>
            </Field>
          </Grid>
        </Grid>

        <div className={style.bottomButton}>
          <Button component={Link} to="/memberships" color="primary" className={style.button}>
                  Cancel
          </Button>

          <Button variant="raised" color="primary" type="submit" className={style.button} disabled={!valid}>
                  Purchase
          </Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'IndividualPurchase',
  overwriteOnInitialValuesChange: true,
  enableReinitialize: true,
  destroyOnUnmount: false
})(IndividualPurchaseForm);
