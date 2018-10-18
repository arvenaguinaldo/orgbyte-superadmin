import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import moment from 'moment';

// Material UI
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LocationIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import PersonPlusIcon from '@material-ui/icons/PersonAdd';
import EventIcon from '@material-ui/icons/Event';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {createStructuredSelector} from 'reselect';
import {makeSelectEvent, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvent} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import showLoadingWhileFetchingDataInsideLayout from 'hoc/showLoadingWhileFetchingDataInsideLayout';

import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import styles from './EventDetails.scss';

class EventDetails extends Component {
  static propTypes = {
    event: PropTypes.object
  };

  static defaultProps = {
    event: {}
  };

  // componentWillMount() {
  //   this.props.fetchEvent(9);
  //   // console.log(this.props.location.key);
  // }

  render() {

    const {event} = this.props;

    const style = {
      height: 400
    };
    const columns = ['No', 'Student No.', 'Name', 'Section', 'Contact No.'];

    const data = [
      ['1', 'Officers', '2014-120436', 'Jeremiah Robles', '09163130373'],
      ['2', 'Officers', '2014-120436', 'Arven Aguinaldo', '0912345879']

    ];
    const image = 'https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png';

    return (
      <LayoutWithTopbarAndSidebar>
        <Paper className={styles.Paper}>
          <Grid container spacing={0}>

            <Grid item xs={12} sm={12} md={12}>

              <Grid container spacing={40}>

                <Grid item xs={10} sm={10} md={6} >
                  <Typography variant="display1" color="secondary" >{event.name}</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon >
                        <EventIcon />
                      </ListItemIcon>
                      <Typography variant="title" className={styles.listTitle}>Date Starts:</Typography>
                      <ListItemText primary={<Typography variant="title">{moment(event.starts).format('MMMM do YYYY, h:mm a')}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon >
                        <EventIcon />
                      </ListItemIcon>
                      <Typography variant="title" className={styles.listTitle}>Date Ends:</Typography>
                      <ListItemText primary={<Typography variant="title">{moment(event.ends).format('MMMM do YYYY, h:mm a')}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon />
                      </ListItemIcon>
                      <Typography variant="title" className={styles.listTitle}>Venue:</Typography>
                      <ListItemText primary={<Typography variant="title">{event.venue}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <Typography variant="title" className={styles.listTitle}>Number of Attendees:</Typography>
                      <ListItemText primary={<Typography variant="title">{event.number_of_attendees}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <PersonPlusIcon />
                      </ListItemIcon>
                      <Typography variant="title" className={styles.listTitle}>Available Slots:</Typography>
                      <ListItemText primary={<Typography variant="title">{event.available_slots}</Typography>} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" component="p" className={styles.listIcon}>₱</Typography>
                      </ListItemIcon>
                      <Typography variant="title" className={styles.bold}>Ticket Price:</Typography>
                    </ListItem>

                    {event.members === true ? (
                      <ListItem className={styles.nested}>
                        <Typography variant="subheading" className={styles.bold}>Members:</Typography>
                        <ListItemText primary={<Typography variant="subheading">{event.members_price === null ? 'FREE' : event.members_price }</Typography>} />
                      </ListItem>
                    ) : null}

                    {event.bulsuans === true ? (
                      <ListItem className={styles.nested}>
                        <Typography variant="subheading" className={styles.bold}>Bulsuans:</Typography>
                        <ListItemText primary={<Typography variant="subheading">{event.bulsuans_price === null ? 'FREE' : event.bulsuans_price }</Typography>} />
                      </ListItem>
                    ) : null}

                    {event.non_bulsuans === true ? (
                      <ListItem className={styles.nested}>
                        <Typography variant="subheading" className={styles.bold}>Non - Bulsuans:</Typography>
                        <ListItemText primary={<Typography variant="subheading">{event.non_bulsuans_price === null ? 'FREE' : event.non_bulsuans_price }</Typography>} />
                      </ListItem>
                    ) : null}
                  </List>

                  <Typography variant="body1" color="secondary" align="justify" className={styles.eventDescription}>
                    {event.description}
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={5} >
                  <CardMedia className={styles.eventImage}>
                    <img src={image} style={style} alt={image} />
                  </CardMedia>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className={styles.actionsDiv}>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Generate Certificate
            </Button>
            <Button component={Link} to={'/events/register/' + event.id} size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Register
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Check-In
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Import
            </Button>
            <Button size="small" variant="contained" color="primary" className={styles.actionsButton}>
                      Edit Event
            </Button>
          </div>
        </Paper>
        <MUIDataTable
          title={'Attendees'}
          data={data}
          columns={columns}
        />
      </LayoutWithTopbarAndSidebar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  meta: makeSelectEventsMeta()
});

// const mapDispatchToProps = {
//   fetchEvent
// };

const withRedux = connect(mapStateToProps, {fetchEvent});

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchEvent(params.id);
});

const withLoadingWhileFetchingDataInsideLayout = showLoadingWhileFetchingDataInsideLayout((props) => {
  return props.meta.isLoading;
});

export default compose(
  withRedux,
  withFetchInitialData,
  withLoadingWhileFetchingDataInsideLayout,
)(EventDetails);
