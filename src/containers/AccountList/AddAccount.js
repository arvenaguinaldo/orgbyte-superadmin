import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';
import Typography from '@material-ui/core/Typography';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'recompose';

import MUIDataTable from 'mui-datatables';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import CustomToolbar from './CustomToolbarSelect';
import mystyle from './AccountList.scss';

class AddAccount extends React.Component {
  static propTypes = {
    organizations: PropTypes.array,
    fetchOrganizations: PropTypes.func.isRequired
  }

  state = {
    columns: ['Id', 'Name', 'Acronym', 'Recogniton No.', 'Date of Formation', 'College', 'Type']
  };

  componentWillMount() {
    this.props.fetchOrganizations();
  }

  changeStuff(newcolumns) {
    this.setState({columns: newcolumns});
  }

  render() {
    const {organizations} = this.props;
    const {columns} = this.state;
    const options = {
      filter: true,
      selectableRows: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      resizableColumns: false,
      customToolbarSelect: selectedRows => <CustomToolbar selectedRows={selectedRows} data={this.state.data} changeHandler={this.changeStuff.bind(this)} columns={this.state.columns} />
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="display1" gutterBottom>
          Add an Account
          <div>
            <Paper className={mystyle.Paper}>
              <form>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} md={12}>

                    <Grid container spacing={32}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Field
                          name="last_name"
                          component={renderTextField}
                          label="Last Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Field
                          name="first_name"
                          component={renderTextField}
                          label="First Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Field
                          name="position"
                          component={renderTextField}
                          label="Position"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <div className={mystyle.bottomButton}>
                          <Button variant="raised" color="primary" type="submit" className={mystyle.button}>
                                Add a member
                          </Button>
                        </div>
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </div>
        </Typography>
        <MUIDataTable
          title={'Account List'}
          data={organizations.map((org) => {
            return [
              org.id,
              org.name,
              org.acronym,
              org.recognition_number,
              org.formation,
              org.college_name,
              org.organization_type_name
            ];
          })}
          columns={columns}
          options={options}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizationsList()
});

const withRedux = connect(mapStateToProps, {fetchOrganizations});


export default compose(
  reduxForm({
    form: 'AddMember',
    destroyOnUnmount: false
  }
  ),
  withRedux,
)(AddAccount);
