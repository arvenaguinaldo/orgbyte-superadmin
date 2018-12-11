import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
// import {Player} from 'video-react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import fetchInitialData from 'hoc/fetchInitialData';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';
import {getRenewal} from 'redux/actions/renewal';
import {makeSelectRenewalDate} from 'redux/selectors/renewal';
import moment from 'moment';

// @material-ui
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Store from '@material-ui/icons/Store';
import College from '@material-ui/icons/Contacts';
import OrganizationIcon from '@material-ui/icons/AccountBalance';
import Calendar from '@material-ui/icons/CalendarToday';
import To from '@material-ui/icons/ArrowForward';
import Members from '@material-ui/icons/SupervisedUserCircle';
import University from '@material-ui/icons/LocalLibrary';
// import Renew from '@material-ui/icons/AutoRenew';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import 'chartist/dist/chartist.min.css';
import styles from './Dashboard.scss';

class Dashboard extends Component {
  static propTypes = {
    organizations: PropTypes.array.isRequired,
    renewal: PropTypes.array
  }

  static defaultProps = {
    organizations: []
  };

  render() {
    const {organizations, renewal} = this.props;
    console.log(organizations);
    let allMemberCount = 0;
    for (let i = 0; i < organizations.length; i += 1) {
      allMemberCount += organizations[i].member_count;
    }
    const organizationCount = organizations.filter(organization => (organization.status === 'active' ? organization.status : null)).map((organization) => {
      return [
        organization.status
      ];
    });
    const uwideCount = organizations.filter(organization => (organization.organization_type_name === 'University Wide' && organization.status === 'active' ? organization.status : null)).map((organization) => {
      return [
        organization.status
      ];
    });
    const cbCount = organizations.filter(organization => (organization.organization_type_name === 'College Based' && organization.status === 'active' ? organization.status : null)).map((organization) => {
      return [
        organization.status
      ];
    });
    const delays = 80;
    const durations = 500;
    // const Chartist = require('chartist');
    const datas = organizations.map((org) => {
      return org.member_count;
    });
    const dataLength = datas.length;
    if (dataLength < 10) {
      for (let i = 0; i < 10 - dataLength; i += 1) {
        datas.push(0);
      }
    }

    const orgNames = organizations.map((org) => {
      return org.acronym;
    });
    const orgNamesLength = orgNames.length;
    if (orgNamesLength < 10) {
      for (let i = 0; i < 10 - orgNamesLength; i += 1) {
        orgNames.push('');
      }
    }

    const highestIndex = datas.indexOf(Math.max(...datas));
    console.log(highestIndex);
    console.log(orgNames[highestIndex]);
    const data = {
      series: [12, 17, 7, 17, 23, 18, 38]
    };
    const chart2 = {
      data: {
        labels: orgNames,
        series: [datas]
      },
      options: {
        axisX: {
          showGrid: false
        },
        low: 10,
        high: 2000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      responsiveOptions: [
        [
          'screen and (max-width: 640px)',
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc(value) {
                return value[0];
              }
            }
          }
        ]
      ],
      animation: {
        draw() {
          if (data.type === 'bar') {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
          }
        }
      }
    };
    return (
      <LayoutWithTopbarAndSidebar>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <div className={styles.OverViewDiv}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={styles.OverViewCard}>
                <CardHeader
                  avatar={
                    <Avatar className={styles.CardAvatar}>
                      <OrganizationIcon className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryText}>Active Organizations</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>{organizationCount.length}</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <OrganizationIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/superadmin/organizations"><Typography variant="subtitle1" color="textSecondary">View Organizations</Typography></Link>} />
                </ListItem>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={styles.OverViewCard}>
                <CardHeader
                  avatar={
                    <Avatar className={styles.CardAvatar}>
                      <Members className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryText}>Registered Members</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>{allMemberCount}</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemText primary={<Typography variant="subtitle1" color="textSecondary" />} />
                </ListItem>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={styles.OverViewCard}>
                <CardHeader
                  avatar={
                    <Avatar className={styles.CardAvatar}>
                      <University className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryTextLong}>University wide organizations</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>{uwideCount.length}</Typography>
                </div>
                <div className={styles.Divider} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={styles.OverViewCard}>
                <CardHeader
                  avatar={
                    <Avatar className={styles.CardAvatar}>
                      <College className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryTextLong}>College based organizations</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>{cbCount.length}</Typography>
                </div>
                <div className={styles.Divider} />
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={6}>
              <Card className={styles.ChartContainer}>
                <Typography variant="caption" color="textSecondary" className={styles.ChartVerticalText}>no. of members</Typography>
                <Card className={styles.ChartCard}>
                  <ChartistGraph
                    className="ct-chart"
                    data={chart2.data}
                    type="Bar"
                    options={chart2.options}
                    listener={chart2.animation}
                  />
                  <Typography variant="caption" color="textSecondary" className={styles.ChartText}>Organizations</Typography>
                </Card>
                <Typography variant="body1" className={styles.ChartPrimaryText}>Organizations with highest member count</Typography>
                <Typography variant="subtitle1" color="textSecondary" className={styles.ChartSecondaryText}>{orgNames[highestIndex]} leading with ({Math.max(null, ...datas)}) members</Typography>
                <div className={styles.DividerChart} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Store />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/superadmin/organizations">View all Organizations</Link>} />
                </ListItem>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              { renewal.length !== 0 ?
                (<Card className={styles.ChartContainer}>
                  <Typography variant="body1" className={styles.ChartPrimaryText}>Renewal Period</Typography>
                  <div className={styles.DateContainer}>
                    <div className={styles.DateContainerMiddle}>
                      <Typography variant="caption" className={styles.Starts}>Start</Typography>
                      <Typography variant="caption" className={styles.Ends}>End</Typography>
                      <Typography variant="body1" className={styles.Year1}>{moment(renewal[0].starts).format('YYYY')}</Typography>
                      <Typography variant="body1" className={styles.Year2}>{moment(renewal[0].ends).format('YYYY')}</Typography>
                      <Typography variant="body1" className={styles.Day1}>{moment(renewal[0].starts).format('DD')}</Typography>
                      <Typography variant="body1" className={styles.Day2}>{moment(renewal[0].ends).format('DD')}</Typography>
                      <Typography variant="body1" className={styles.Month1}>{moment(renewal[0].starts).format('MMM')}</Typography>
                      <Typography variant="body1" className={styles.Month2}>{moment(renewal[0].ends).format('MMM')}</Typography>
                      <Calendar className={styles.OverViewIconRenewal} />
                      <To className={styles.To} />
                      <Calendar className={styles.OverViewIconRenewal} />
                      <Typography variant="body1" color="textSecondary" className={styles.Note}>*Organizations that did not renew after said date will automatically be archived</Typography>
                    </div>
                  </div>
                  <div className={styles.DividerChart} />
                  <ListItem className={styles.CardBottomText}>
                    <ListItemIcon >
                      <Store />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/superadmin/renewaldate">Manage Renewal Period</Link>} />
                  </ListItem>
                </Card>) :
                (
                  <Card className={styles.ChartContainerEmpty}>
                    <Typography variant="body1" className={styles.ChartPrimaryText}>Renewal Period</Typography>
                    <Typography variant="h5" className={styles.Note}>No Renewal date set</Typography>
                  </Card>
                )
              }
            </Grid>
          </Grid>
        </div>
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizationsList(),
  renewal: makeSelectRenewalDate(),
  meta: makeSelectOrganizationsMeta()
});

const mapDispatchToProps = {
  fetchOrganizations,
  getRenewal
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchOrganizations();
  props.getRenewal();
});


export default compose(
  withRedux,
  withFetchInitialData
)(Dashboard);
