import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
// import {Player} from 'video-react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import fetchInitialData from 'hoc/fetchInitialData';
import {makeSelectOrganizationsList, makeSelectOrganizationsMeta} from 'redux/selectors/organizations';
import {fetchOrganizations} from 'redux/actions/organizations';


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
import University from '@material-ui/icons/LocalLibrary';
// import Renew from '@material-ui/icons/AutoRenew';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import 'chartist/dist/chartist.min.css';
import styles from './Dashboard.scss';

class Dashboard extends Component {
  static propTypes = {
    organizations: PropTypes.array.isRequired
  }

  static defaultProps = {
    organizations: []
  };

  render() {
    const {organizations} = this.props;
    console.log(organizations);
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
    const data = {
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    };
    const chart2 = {
      data: {
        labels: [
          'Swits',
          'BioSoc',
          'Math',
          'Romasu',
          'Swits',
          'BioSoc',
          'Swits',
          'Romasu',
          'BioSoc',
          'Romasu',
          'BioSoc',
          'Romasu'
        ],
        series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
      },
      options: {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
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
                      <Calendar className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryText}>Renewal Period</Typography>
                  <Typography variant="body2" className={styles.DateText}>12/21/1995 to 12/21/1996</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Calendar />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/superadmin/renewaldate"><Typography variant="subtitle1" color="textSecondary">Renewal Period</Typography></Link>} />
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
              <ReactPlayer height="330px" url="https://www.youtube.com/watch?v=0Zl5moDWab0" playing />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Card className={styles.ChartContainer}>
                <Card className={styles.ChartCard}>
                  <ChartistGraph
                    className="ct-chart"
                    data={chart2.data}
                    type="Bar"
                    options={chart2.options}
                    listener={chart2.animation}
                  />
                </Card>
                <Typography variant="body1" className={styles.ChartPrimaryText}>Organizations with highest member count</Typography>
                <Typography variant="subtitle1" color="textSecondary" className={styles.ChartSecondaryText}>SWITS leading with (69) members</Typography>
                <div className={styles.DividerChart} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Store />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/superadmin/organizations">View all Organizations</Link>} />
                </ListItem>
              </Card>
            </Grid>
          </Grid>
        </div>
      </LayoutWithTopbarAndSidebar>
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
)(Dashboard);
