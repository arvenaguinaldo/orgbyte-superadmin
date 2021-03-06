import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm, FormSection} from 'redux-form';
import {validate} from 'utils/Validations/AddOrganizationalShirt';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import {renderTextField, renderCheckbox} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createNumberMask} from 'redux-form-input-masks';
import {addOrgShirt, addOrgShirtSuccess} from 'redux/actions/shirts';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {makeSelectShirt, makeSelectShirtsMeta} from 'redux/selectors/shirts';
import {fetchShirt} from 'redux/actions/shirts';
import {fetchSizes} from 'redux/actions/shirts';
import fetchInitialData from 'hoc/fetchInitialData';
import SubmitButton from 'components/SubmitButton/SubmitButton';


// Material UI
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FileUpload from 'components/FileUpload/FileUpload';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import style from './AddOrganizationalShirt.scss';


const styles = ({
  root: {
    width: '100%'
  }
});

class AddOrganizationalShirt extends Component {
  static propTypes = {
    addOrgShirt: PropTypes.func.isRequired,
    addOrgShirtSuccess: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    meta: PropTypes.object
  }

  onSubmit = (values) => {
    this.props.addOrgShirt(values, (data) => {
      this.fileUpload.processQueue(data.id);
      return {type: 'shirt_image_upload_in_progress'};
    });
  };

  handleUploadSuccess = (file, response) => {
    this.props.addOrgShirtSuccess(response);
  }

  render() {
    const {classes, meta} = this.props;

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types

    const priceMask = createNumberMask({
      prefix: '₱',
      decimalPlaces: 2,
      guide: false
    });

    const checkboxLabel = [
      {label: 'XXS', name: 'xxsmall'},
      {label: 'XS', name: 'xsmall'},
      {label: 'S', name: 'small'},
      {label: 'M', name: 'medium'},
      {label: 'L', name: 'large'},
      {label: 'XL', name: 'xlarge'},
      {label: '2XL', name: 'xxlarge'},
      {label: '3XL', name: 'xxxlarge'},
      {label: '4XL', name: 'xxxxlarge'}
    ];

    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>
          Add a Organizational Shirt
        </Typography>
        <div className={classes.root}>
          <Paper className={style.form} elevation={0} square={false} >

            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container spacing={24}>

                    <Grid item xs={12} sm={12} md={6} >
                      <Typography variant="h5" gutterBottom>
                        Organizational Shirt Design
                      </Typography>


                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={10}>
                          <FileUpload
                            paramName="image"
                            acceptedFiles="image/jpeg, image/png"
                            thumbnailWidth={200}
                            thumbnailHeight={200}
                            autoProcessQueue={false}
                            ref={(element) => { this.fileUpload = element; }}
                            onUploadSuccess={this.handleUploadSuccess}
                            uploadUrl="/shirts/image"
                            label="Drop image here or click to upload"
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="h5" gutterBottom>
                          Shirt Info
                      </Typography>

                      <FormSection name="shirt">
                        <Grid container spacing={24}>
                          <Grid item xs={12} sm={12} md={6} >
                            <Field
                              required
                              name="name"
                              component={renderTextField}
                              label="Name"
                              fullWidth
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                          <Grid item xs={12} sm={12} md={6} >
                            <Field
                              required
                              name="price"
                              component={renderTextField}
                              label="Price"
                              fullWidth
                              {...priceMask}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={24} >
                          <Grid item xs={12} sm={12} md={12} >
                            <Field
                              required
                              name="description"
                              component={renderTextField}
                              label="Description"
                              fullWidth
                              multiline
                              rows={3}
                            />
                          </Grid>
                        </Grid>
                      </FormSection>

                      <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={12} >
                          <FormSection name="shirt_size">
                            {checkboxLabel.map(option => (
                              <Field
                                key={option.name}
                                name={option.name}
                                component={renderCheckbox}
                                label={option.label}
                              />
                            ))}
                          </FormSection>
                        </Grid>
                      </Grid>


                    </Grid>


                  </Grid>
                </Grid>
              </Grid>

              <div className={style.bottomButton}>
                <Button component={Link} to="/admin/shirts" color="primary" className={style.button}>
                  Cancel
                </Button>
                <SubmitButton loading={meta.isLoading} valid={!valid}>
                  Save
                </SubmitButton>
              </div>
            </form>
          </Paper>
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  shirt: makeSelectShirt(),
  meta: makeSelectShirtsMeta()
});

const mapDispatchToProps = {
  addOrgShirt,
  addOrgShirtSuccess,
  fetchSizes,
  fetchShirt
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchShirt();
});

export default compose(
  withRedux,
  withFetchInitialData,
  reduxForm({
    form: 'AddOrgShirtForm',
    destroyOnUnmount: false,
    validate
  }),
  withStyles(styles)
)(AddOrganizationalShirt);

