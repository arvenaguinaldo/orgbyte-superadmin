import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';
import fetchInitialData from 'hoc/fetchInitialData';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import UserAvatar from 'react-user-avatar';
import Center from 'react-center';

import style from './Organizations.scss';

class Organizations extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    organizations: PropTypes.array.isRequired
  };

  static defaultProps = {
    organizations: []
  };

  render() {
    const {classes, organizations} = this.props;

    return (
      <div className={style.ChildContainer}>
        <Grid container spacing={8}>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant="h4" className={style.SectionHeading}>
              ORGANIZATIONS
            </Typography>
          </Grid>
          <Grid container spacing={0}>
            {organizations.slice(0, 6).map((org) => {
              return (
                <Grid item lg={2} md={2} sm={6} xs={6}>
                  <Card className={style.OrganizationCard}>
                    <Center>
                      <CardContent>
                        <Center>
                          <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png" />
                        </Center>
                        <Center>
                          <Typography variant="caption" className={classes.type}>
                            {org.acronym}
                          </Typography>
                        </Center>
                      </CardContent>
                    </Center>
                  </Card>
                </Grid>
              );
            })}

          </Grid>
        </Grid>

        <div className={style.OrganizationButton}>
          <Button size="small" variant="contained" color="primary">
           See more
          </Button>
        </div>

      </div>
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
)(Organizations);
