import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import {renderTextField, renderCheckboxGroup, renderCheckbox} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createNumberMask} from 'redux-form-input-masks';


// Material UI

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FileUpload from 'components/FileUpload/FileUpload';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import style from './OrganizationalShirtInfo.scss';

const styles = ({
  root: {
    width: '100%'
  }
});

class OrganizationalShirtInfo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const {classes} = this.props;

    const {valid, handleSubmit} = this.props; // eslint-disable-line react/prop-types

    const priceMask = createNumberMask({
      prefix: '₱',
      decimalPlaces: 2,
      guide: false
    });
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="display1" gutterBottom>
          Add a Organizational Shirt
        </Typography>
        <div className={classes.root}>
          <Paper className={style.form} elevation={0} square={false} >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container spacing={24}>

                    <Grid item xs={12} sm={12} md={6} >
                      <Typography variant="headline" gutterBottom>
                        Organizational Shirt Design
                      </Typography>


                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={10}>
                          <FileUpload paramName="file" maxFilesize={200} size="large" uploadUrl="http://s3.ap-southeast-1.amazonaws.com/orgbyte" label="Upload or Drag an Image" />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="headline" gutterBottom>
                          Shirt Info
                      </Typography>

                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={6} >
                          <Field
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
                            name="price"
                            component={renderTextField}
                            label="Price"
                            fullWidth
                            {...priceMask}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={12} >
                          <Field
                            name="checkbox_group"
                            component={renderCheckboxGroup}
                            label="Available Sizes"
                            fullWidth
                          >
                            <Field
                              name="xxs"
                              component={renderCheckbox}
                              label="XXS"
                            />

                            <Field
                              name="xs"
                              component={renderCheckbox}
                              label="XS"
                            />

                            <Field
                              name="s"
                              component={renderCheckbox}
                              label="S"
                            />

                            <Field
                              name="m"
                              component={renderCheckbox}
                              label="M"
                            />

                            <Field
                              name="l"
                              component={renderCheckbox}
                              label="L"
                            />

                            <Field
                              name="xl"
                              component={renderCheckbox}
                              label="XL"
                            />

                            <Field
                              name="2xl"
                              component={renderCheckbox}
                              label="2XL"
                            />

                            <Field
                              name="3xl"
                              component={renderCheckbox}
                              label="3XL"
                            />
                          </Field>
                        </Grid>
                      </Grid>

                      <Grid container spacing={24} >
                        <Grid item xs={12} sm={12} md={12} >
                          <Field
                            name="description"
                            component={renderTextField}
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                          />
                        </Grid>
                      </Grid>
                    </Grid>


                  </Grid>
                </Grid>
              </Grid>

              <div className={style.bottomButton}>
                <Button component={Link} to="/shirts" color="primary" className={style.button}>
                  Cancel
                </Button>

                <Button variant="raised" color="primary" type="submit" className={style.button} disabled={!valid}>
                  Save
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

// export default withStyles(styles)(OrganizationalShirtInfo);

export default compose(
  reduxForm({
    form: 'AddOrgShirtFOrm',
    destroyOnUnmount: false
  }),
  withStyles(styles)
)(OrganizationalShirtInfo);

