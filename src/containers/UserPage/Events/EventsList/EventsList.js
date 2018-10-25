import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Center from 'react-center';
import Moment from 'moment';

import {makeSelectEventsList, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvents} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';


import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia, Paper, ListItem} from '@material-ui/core';
import Venue from '@material-ui/icons/PinDrop';
import Event from '@material-ui/icons/Event';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';

import style from './EventList.scss';

class EventList extends Component {
  static propTypes = {
    events: PropTypes.array
  };
  static defaultProps = {
    events: []
  };
  state = {
    pageCount: 20
  };

  render() {
    const {events} = this.props;
    Moment.locale('en');
    return (
      <TopBarAndFooter>
        <div className={style.ChildContainer}>
          <Grid container spacing={8}>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h4" className={style.SectionHeading}>
                Events
              </Typography>
            </Grid>
            <Grid container spacing={0}>
              {events.map((event) => {
                return (
                  <Grid item lg={3} md={3} sm={12} xs={12} key={event.id}>

                    <Paper elevation={0} className={style.EventPaper}>

                      <Card className={style.EventCard}>
                        <CardMedia
                          className={style.EventImage}
                          image="https://i.postimg.cc/43SNX3Qq/launch.jpg"
                        />
                      </Card>

                      <Grid container className={style.EventDateContainer}>
                        <Center>
                          <Grid item lg={4} md={4} sm={4} xs={4} >
                            <Center>
                              <Typography variant="body1" className={style.EventMonth}>{Moment(event.starts).format('MMM')}</Typography>
                            </Center>
                            <Center>
                              <Typography variant="h5">{Moment(event.starts).format('DD')}</Typography>
                            </Center>
                          </Grid>
                        </Center>
                        <Grid item lg={10} md={10} sm={10} xs={10} >
                          <ListItem>
                            <ListItemIcon>
                              <Event />
                            </ListItemIcon>
                            <ListItemText inset primary={<Typography variant="body1" className={style.EventName}>{event.name}</Typography>} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <Venue />
                            </ListItemIcon>
                            <ListItemText inset primary={<Typography variant="body1" className={style.EventVenue}>{event.venue}</Typography>} />
                          </ListItem>
                          <Typography variant="caption" className={style.EventHost}>
                            {event.organization_name}
                          </Typography>

                        </Grid>
                      </Grid>
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
  events: makeSelectEventsList(),
  meta: makeSelectEventsMeta()
});

const mapDispatchToProps = {
  fetchEvents
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchEvents();
});

export default compose(
  withRedux,
  withFetchInitialData
)(EventList);
