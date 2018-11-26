import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';

import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectMembersList, makeSelectUsersMeta} from 'redux/selectors/users';
import {fetchMembers} from 'redux/actions/users';
import fetchInitialData from 'hoc/fetchInitialData';

// @material-ui
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Event from '@material-ui/icons/Event';
import People from '@material-ui/icons/People';
import Calendar from '@material-ui/icons/CalendarToday';
import Announcement from '@material-ui/icons/Announcement';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './AdminDashboard.scss';

class Dashboard extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired
  }

  static defaultProps = {
    members: []
  };
  render() {
    const delays = 80;
    const durations = 500;
    const {members} = this.props;
    console.log(members);
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    };
    const options = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 0
      }
    };
    // for animation
    const animation = {
      draw() {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
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
                    <Avatar className={styles.CardAvatar1}>
                      <People className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryText}>Active members</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>1434</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <People />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/superadmin/organizations"><Typography variant="subtitle1" color="textSecondary">View membership list</Typography></Link>} />
                </ListItem>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={styles.OverViewCard}>
                <CardHeader
                  avatar={
                    <Avatar className={styles.CardAvatar2}>
                      <Event className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryText}>Events created</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>20</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Event />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/superadmin/organizations"><Typography variant="subtitle1" color="textSecondary">View Events</Typography></Link>} />
                </ListItem>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={styles.OverViewCard}>
                <CardHeader
                  avatar={
                    <Avatar className={styles.CardAvatar3}>
                      <Announcement className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryText}>Announcements posted</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>10</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Announcement />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/superadmin/organizations"><Typography variant="subtitle1" color="textSecondary">View Announcements</Typography></Link>} />
                </ListItem>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={styles.OverViewCard}>
                <CardHeader
                  avatar={
                    <Avatar className={styles.CardAvatar4}>
                      <Calendar className={styles.OverViewIcon} />
                    </Avatar>
                  }
                  className={styles.CardHeader}
                />
                <div className={styles.CardUpperText}>
                  <Typography variant="subtitle1" color="textSecondary" className={styles.SecondaryText}>Next renewal date</Typography>
                  <Typography variant="subtitle1" className={styles.PrimaryText}>Jan 12 2018</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText} />
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={6}>
              <Card className={styles.ChartContainer}>
                <Card className={styles.ChartCard}>
                  <ChartistGraph
                    className="ct-chart"
                    data={data}
                    type="Line"
                    options={options}
                    listener={animation}
                  />
                </Card>
                <Typography variant="body1" className={styles.ChartPrimaryText}>Events held for this year</Typography>
                <Typography variant="subtitle1" color="textSecondary" className={styles.ChartSecondaryText}>Month of December having total count of (3) events</Typography>
                <div className={styles.DividerChart} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Calendar />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/admin/events">Manage Events</Link>} />
                </ListItem>
              </Card>
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
                <Typography variant="body1" className={styles.ChartPrimaryText}>Highest users sign in count</Typography>
                <Typography variant="subtitle1" color="textSecondary" className={styles.ChartSecondaryText}>Arven Aguinaldo highest with (200) total sign in</Typography>
                <div className={styles.DividerChart} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/admin/accounts">View Accounts</Link>} />
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
  members: makeSelectMembersList(),
  meta: makeSelectUsersMeta()
});

// const mapDispatchToProps = {
//   fetchEvents
// };

const withRedux = connect(mapStateToProps, {fetchMembers});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchMembers();
});

export default compose(
  withRedux,
  withFetchInitialData
)(Dashboard);

