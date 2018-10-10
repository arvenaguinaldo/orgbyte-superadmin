import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createStructuredSelector} from 'reselect';
import {createTextMask} from 'redux-form-input-masks';
import {fetchOrganization} from 'redux/actions/organizations';
import {makeSelectOrganizationSelectedOrg} from 'redux/selectors/organizations';


import {renderTextField, renderSelectField, renderDatePicker} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

// Material UI
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const styles = () => ({
  paper: {
    // width: '1500px'
  }
});

class EditData extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    fetchOrganization: PropTypes.func,
    organization: PropTypes.array
  };

  state = {
    selectedDate: new Date()
  };

  componentWillMount() {
    const {id} = this.props;
    this.props.fetchOrganization(id);
  }

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
  }

  render() {
    const recognitionNumberMask = createTextMask({
      pattern: '99-999',
      placeholder: ' '
    });
    const {classes, open, handleClose, organization} = this.props;
    return (
      <div>
        <Dialog
          className={classes.paper}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title" disableTypography><Typography component="h3" variant="display1">Edit</Typography></DialogTitle>
          <DialogContent>
            <form initialvalues={organization}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>

                  <Grid container spacing={40}>
                    <Grid item xs={10} sm={10} md={4}>
                      <Field
                        name="name"
                        component={renderTextField}
                        label="Organization Name"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="organization_type_id"
                        component={renderSelectField}
                        label="Type of Organization"
                        fullWidth
                      >
                        <MenuItem value={1}>Univesity Based</MenuItem>
                        <MenuItem value={2}>College Based</MenuItem>
                      </Field>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="organization_nature_id"
                        component={renderSelectField}
                        label="Nature of Organiation"
                        fullWidth
                      >
                        <MenuItem value={1}>Academic</MenuItem>
                      </Field>
                    </Grid>
                  </Grid>

                  <Grid container spacing={32}>
                    <Grid item xs={6} sm={6} md={2}>
                      <Field
                        name="acronym"
                        component={renderTextField}
                        label="Acronym"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={10} sm={10} md={3}>
                      <Field
                        name="recognition_number"
                        component={renderTextField}
                        label="Recognition Number"
                        fullWidth
                        {...recognitionNumberMask}
                      />
                    </Grid>

                    <Grid item xs={11} sm={11} md={3}>
                      <Field
                        name="formation"
                        component={renderDatePicker}
                        selected={this.state.selectedDate}
                        label="Date of Formation"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <Field
                        name="college_id"
                        component={renderSelectField}
                        label="College"
                        fullWidth
                      >
                        <MenuItem value={1}>College of Information and Communications Technology</MenuItem>
                        <MenuItem value={2}>College of Industrial Technology</MenuItem>
                      </Field>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="raised" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// export default reduxForm({
//   form: 'EditOrganizationDataForm',
//   destroyOnUnmount: false
// }),
// withStyles(styles)(EditOrganizationData);

// export default withStyles(styles)(EditOrganizationData);

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganizationSelectedOrg()
});

const withRedux = connect(mapStateToProps, {fetchOrganization});

export default compose(
  reduxForm({
    form: 'EditData',
    destroyOnUnmount: false
  }),
  withRedux,
  withStyles(styles)
)(EditData);
