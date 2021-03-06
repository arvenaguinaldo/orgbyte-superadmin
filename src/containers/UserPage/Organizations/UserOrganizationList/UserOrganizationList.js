import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import {renderTextField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';
import fetchInitialData from 'hoc/fetchInitialData';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {Grid, Avatar, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';

const styles = {
  root: {
    flexGrow: 1
  },
  content: {
    padding: 10
  },
  header: {
    padding: 10,
    marginLeft: 30
  },
  card: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  paper: {
    marginTop: 10,
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)',
      borderRight: 'solid balck 2px'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  type: {
    color: 'black'},
  media: {
    height: 120,
    width: '100%'
  },
  list: {
    padding: '0px',
    lineHeight: '10',
    paddingLeft: 0
  },
  listName: {
    padding: '0px',
    fontWeight: 'bold',
    lineHeight: '10',
    paddingLeft: 0
  },
  events1: {
    height: '100%',
    width: '100%'
  },
  paper2: {
    margin: '5px',
    padding: 10,
    '&:hover': {
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
    }
  },
  butt: {
    float: 'right'
  },
  annou: {
    width: 190,
    height: 190,
    marginLeft: 30
  },
  image2: {
    height: '100px'
  },
  title2: {
    paddingTop: 10,
    boxShadow: 'none'
  },
  filter: {
    padding: 30,
    marginTop: 5
  }
};

function searchingFor(term) {
  return function (x) { // eslint-disable-line
    return x.name.toLowerCase().includes(term.toLowerCase());
  };
}

class UserOrganizationList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    organizations: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func
  };
  static defaultProps = {
    organizations: []
  };
  state = {
    term: '',
    type: 'reset'
  };
  searchHandler = (event) => {
    this.setState({term: event.target.value});
  };
  handleNature = (value) => {
    const nature = {value};
    if (nature.value === '1') {
      this.setState({nature: 'curricular'});
    } else if (nature.value === '2') {
      this.setState({nature: 'co_curricular'});
    } else { this.setState({nature: 'reset'}); }
  }
  render() {
    const {classes, organizations, handleSubmit} = this.props;
    console.log(organizations);
    Moment.locale('en');
    return (
      <TopBarAndFooter>
        <div className={classes.root}>
          <Typography variant="h4" className={classes.header} >
            Organizations
          </Typography>
          <Grid container >
            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.content} >
              <Paper className={classes.filter}>
                <Typography variant="h6" >
                     Filter Organizations
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="search"
                      component={renderTextField}
                      label="Search Organizations"
                      fullWidth
                      className={styles.searchField}
                      onChange={this.searchHandler}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="organization_type_id"
                      component={renderSelectField}
                      label="Type of Organization"
                      fullWidth
                    >
                      <option value="" />
                      <option value={1}>Univesity Based</option>
                      <option value={2}>College Based</option>
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="organization_nature_id"
                      component={renderSelectField}
                      label="Nature of Organiation"
                      fullWidth
                    >
                      <option value="" />
                      <option value={1}>Academic</option>
                    </Field>
                  </Grid> */}
                </form>
              </Paper>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12} className={classes.content} >

              <Grid container spacing={0}>
                {organizations.filter(searchingFor(this.state.term)).map((org) => {
                  return (
                    <Grid item lg={12} md={12} sm={12} xs={12} key={org.id}>
                      <Link key={org.id} to={'/organizations/' + org.acronym}>
                        <Card className={classes.paper2}>
                          <Grid container spacing={0}>
                            <Grid item md={3} xs={12}>
                              <Card>
                                {org.logo_blobs.length === 0 ?
                                  <Avatar
                                    alt="Organization Logo"
                                    src="https://i.postimg.cc/nVGQ2Lqs/ang-pogi-ni-jeremiah-Robles.png"
                                    className={classes.annou}
                                  />
                                  :
                                  <Avatar
                                    alt="Organization Logo"
                                    src={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + org.logo_blobs[0].key}
                                    className={classes.annou}
                                  />
                                }

                              </Card>
                            </Grid>
                            <Grid item md={9} xs={12} >
                              <Paper className={classes.title2}>
                                <Typography variant="h5">
                                  {org.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Established {Moment(org.formation).format('MMMM DD YYYY')}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                  {org.organization_type_name} Organization
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                 Nature of Organization {org.organization_nature_name}
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Card>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </TopBarAndFooter>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizationsList(),
  meta: makeSelectOrganizationsMeta()
});

const mapDispatchToProps = {
  fetchOrganizations
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOrganizations();
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles),
  reduxForm({
    form: 'Filter',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false
  })
)(UserOrganizationList);
