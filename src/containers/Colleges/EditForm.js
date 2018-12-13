import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {connect} from 'react-redux';


import {makeSelectCollegesMeta} from 'redux/selectors/colleges';
// import fetchInitialData from 'hoc/fetchInitialData';

import {validate} from 'utils/Validations/AddCollege';

// Material UI
import Grid from '@material-ui/core/Grid';

class EditForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  };

  state = {
    selectedDate: new Date()
  };

  render() {

    const {handleSubmit} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={32}>
                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    name="name"
                    component={renderTextField}
                    label="College Name"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    name="college_code"
                    component={renderTextField}
                    label="College Code"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  meta: makeSelectCollegesMeta()
});

// const mapDispatchToProps = {
//   fetchColleges,
//   fetchOrganizationNatures
// };

const withRedux = connect(mapStateToProps, null);

// const withFetchInitialData = fetchInitialData((props) => {
//   props.fetchOrganizationNatures();
//   props.fetchColleges();
// });

export default compose(
  withRedux,
  reduxForm({
    form: 'EditForm',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
  })
)(EditForm);
