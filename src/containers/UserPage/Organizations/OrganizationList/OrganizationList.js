import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';
import fetchInitialData from 'hoc/fetchInitialData';


import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia, Paper} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';

import style from './OrganizationList.scss';

class OrganizationList extends Component {
  static propTypes = {
    organizations: PropTypes.array.isRequired
  };

  static defaultProps = {
    organizations: []
  };

  render() {
    const {organizations} = this.props;
    return (
      <TopBarAndFooter>
        <div className={style.ChildContainer}>
          <Grid container spacing={8}>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h4" className={style.SectionHeading}>
                Organizations
              </Typography>
            </Grid>
            <Grid container spacing={0}>
              {organizations.map((org) => {
                return (
                  <Grid item lg={3} md={3} sm={12} xs={12} key={org.id}>

                    <Paper elevation={0} className={style.OrganizationPaper}>
                      <List>
                        <ListItem>
                          <CardMedia
                            component="img"
                            alt="Organization Image"
                            height="200"
                            width="140"
                            image="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png"
                            title="Org Image"
                            className={style.OrganizationImage}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem disableGutters>
                          <Typography variant="h6" className={style.OrganizationAcronym}>{org.acronym}</Typography>
                        </ListItem>
                        <Typography variant="body1" className={style.OrganizationName}>{org.name}</Typography>
                      </List>

                    </Paper>
                  </Grid>
                );
              })}
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
  withFetchInitialData
)(OrganizationList);
