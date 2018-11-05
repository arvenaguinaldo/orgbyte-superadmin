import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';
import fetchInitialData from 'hoc/fetchInitialData';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {Grid, CardMedia, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

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
    padding: '0px',
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)'
    }
  },
  butt: {
    float: 'right'
  },
  annou: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
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

class UserOrganizationList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    organizations: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func
  };
  static defaultProps = {
    organizations: []
  };
  render() {
    const {classes, organizations, handleSubmit} = this.props;
    Moment.locale('en');
    return (
      <TopBarAndFooter>
        <div className={classes.root}>
          <Typography variant="h4" className={classes.header} >Organizations</Typography>
          <Grid container >
            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.content} >
              <Paper className={classes.filter}>
                <Typography variant="h6" >
                     Filter Organizations
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="name"
                      component={renderTextField}
                      label="Organization Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
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
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="organization_nature_id"
                      component={renderSelectField}
                      label="Nature of Organiation"
                      fullWidth
                    >
                      <MenuItem value={1}>Academic</MenuItem>
                    </Field>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12} className={classes.content} >

              <Grid container spacing={0}>
                {organizations.map((org) => {
                  return (
                    <Grid item lg={12} md={12} sm={12} xs={12} key={org.id}>
                      <Card className={classes.paper2}>
                        <Grid container spacing={16}>
                          <Grid item xs={3}>
                            <Card className={classes.image2}>
                              <CardMedia
                                className={classes.annou}
                                image="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png"
                              />
                            </Card>
                          </Grid>
                          <Grid item xs={9} >
                            <Paper className={classes.title2}>
                              <Typography variant="h6">
                                {org.name}
                              </Typography>
                              <Typography variant="caption">
                                  Established:
                              </Typography>
                              <Typography variant="body1">
                                {Moment(org.formation).format('MMMM DD YYYY')}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Card>
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
