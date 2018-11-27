import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import moment from 'moment';

import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {makeSelectMembersList, makeSelectUsersMeta} from 'redux/selectors/users';
import {makeSelectEventsList} from 'redux/selectors/events';
import {makeSelectAnnouncementsList} from 'redux/selectors/announcements';
import {fetchAnnouncements} from 'redux/actions/announcements';

import {fetchOfficers} from 'redux/actions/users';
import {makeSelectOfficersList} from 'redux/selectors/users';

import {fetchEvents} from 'redux/actions/events';

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

let jan = null;
let feb = null;
let mar = null;
let apr = null;
let may = null;
let jun = null;
let jul = null;
let aug = null;
let sep = null;
let oct = null;
let nov = null;
let dec = null;
const year = moment(new Date()).format('YYYY');
const month = moment(new Date()).format('MM');

class Dashboard extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    announcements: PropTypes.array.isRequired,
    officers: PropTypes.array
  }
  static defaultProps = {
    members: [],
    events: [],
    announcements: []
  };
  getCount = (startsDate) => {
    moment.locale('en');
    const eventYear = moment(startsDate).format('YYYY');
    const eventMonth = moment(startsDate).format('MMM');
    const eventMonthDigit = moment(startsDate).format('MM');
    if (eventYear === year && eventMonth === 'Jan') {
      jan += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Jan' && eventMonthDigit < 1) {
      jan = null;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Feb') {
      feb += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Feb' && +eventMonthDigit > +month) {
      feb = null;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Mar') {
      mar += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Apr') {
      apr += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'May') {
      may += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Jun') {
      jun += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Jul') {
      jul += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Aug') {
      aug += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Sep') {
      sep += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Oct') {
      oct += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Nov') {
      nov += 1;
      return startsDate;
    }
    if (eventYear === year && eventMonth === 'Dec') {
      dec += 1;
      return startsDate;
    }
  }

  render() {
    jan = 0;
    feb = 0;
    mar = 0;
    apr = 0;
    may = 0;
    jun = 0;
    jul = 0;
    aug = 0;
    sep = 0;
    oct = 0;
    nov = 0;
    dec = 0;
    const delays = 80;
    const durations = 500;
    const {members, events, announcements, officers} = this.props;
    // line chart
    const activeMemberCount = members.filter(member => (member.status === 'active' ? member.status : null)).map((member) => {
      return [
        member.status
      ];
    });
    const eventsHeld = events.filter(event => this.getCount(event.starts)).map((event) => { // eslint-disable-line
      return event;
    });
    const eventsCreated = events.length;
    const announcementsCreated = announcements.length;
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [[
        month < 1 ? null : jan,
        month < 2 ? null : feb,
        month < 3 ? null : mar,
        month < 4 ? null : apr,
        month < 5 ? null : may,
        month < 6 ? null : jun,
        month < 7 ? null : jul,
        month < 8 ? null : aug,
        month < 9 ? null : sep,
        month < 10 ? null : oct,
        month < 11 ? null : nov,
        month < 12 ? null : dec
      ]]
    };
    const options = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 15, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
    const officerNames = officers.slice(0, 5).map((officer) => {
      return officer.first_name
      ;
    });
    console.log(officerNames);
    const chart2 = {
      data: {
        labels: officerNames,
        series: [[542, 443, 40, 450]]
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
                  <Typography variant="subtitle1" className={styles.PrimaryText}>{activeMemberCount.length}</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <People />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/admin/memberships"><Typography variant="subtitle1" color="textSecondary">View membership list</Typography></Link>} />
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
                  <Typography variant="subtitle1" className={styles.PrimaryText}>{eventsCreated}</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Event />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/admin/events"><Typography variant="subtitle1" color="textSecondary">View Events</Typography></Link>} />
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
                  <Typography variant="subtitle1" className={styles.PrimaryText}>{announcementsCreated}</Typography>
                </div>
                <div className={styles.Divider} />
                <ListItem className={styles.CardBottomText}>
                  <ListItemIcon >
                    <Announcement />
                  </ListItemIcon>
                  <ListItemText primary={<Link to="/admin/announcements"><Typography variant="subtitle1" color="textSecondary">View Announcements</Typography></Link>} />
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
                <Typography variant="subtitle1" color="textSecondary" className={styles.ChartSecondaryText} />
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
                <Typography variant="subtitle1" color="textSecondary" className={styles.ChartSecondaryText} />
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
  events: makeSelectEventsList(),
  announcements: makeSelectAnnouncementsList(),
  officers: makeSelectOfficersList(),
  meta: makeSelectUsersMeta()
});

// const mapDispatchToProps = {
//   fetchEvents
// };

const withRedux = connect(mapStateToProps, {fetchMembers, fetchEvents, fetchAnnouncements, fetchOfficers});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchMembers();
  props.fetchEvents();
  props.fetchAnnouncements();
  props.fetchOfficers();
});

export default compose(
  withRedux,
  withFetchInitialData
)(Dashboard);

