import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

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
    organizations: PropTypes.array.isRequired
  };

  static defaultProps = {
    organizations: []
  };

  render() {
    const {organizations} = this.props;
    return (
      <div className={style.ChildContainer}>
        <Grid container spacing={8}>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant="h5" className={style.SectionHeading}>
              ORGANIZATIONS
            </Typography>
          </Grid>
          <Grid container spacing={0}>
            { organizations.length !== 0 ?
              (organizations.slice(0, 6).map((org) => {
                return (
                  <Grid key={org.id} item lg={2} md={2} sm={6} xs={6}>
                    <Link key={org.id} to={'/organizations/' + org.acronym}>
                      <Card className={style.OrganizationCard}>
                        <Center>
                          <CardContent>
                            <Center>
                              {org.logo_blobs.length === 0 ?
                                <UserAvatar size="140" name="Society for the Welfare ..." src="https://i.postimg.cc/nVGQ2Lqs/ang-pogi-ni-jeremiah-Robles.png" />
                                :
                                <UserAvatar size="140" name="Society for the Welfare ..." src={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + org.logo_blobs[0].key} />
                              }
                            </Center>
                            <Center>
                              <Typography variant="caption" className={style.OrgName}>
                                {org.name}
                              </Typography>
                            </Center>
                            <Center>
                              <Typography variant="caption" className={style.Details} color="textSecondary">
                                ({org.organization_type_name} {org.organization_nature_name} organization)
                              </Typography>
                            </Center>
                          </CardContent>
                        </Center>
                      </Card>
                    </Link>
                  </Grid>
                );
              })) :
              (<Grid item md={12} sm={12} xs={12}>
                <div className={style.AnnouncementEmpty}>
                  <Typography variant="h6" className={style.EmptyMessage} color="textSecondary">
                      No Organizations Registered
                  </Typography>
                </div>
              </Grid>)
            }

          </Grid>
        </Grid>

        { organizations.length !== 0 && organizations.length > 6 ?
          (<div className={style.OrganizationButton}>
            <Link to={'/organizations/'}>
              <Button size="small" variant="contained" color="primary">
                See more
              </Button>
            </Link>
          </div>) :
          (null)
        }

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
