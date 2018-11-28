import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Center from 'react-center';
import Moment from 'moment';

import {makeSelectEventsList, makeSelectEventsMeta} from 'redux/selectors/events';
import {fetchEvents} from 'redux/actions/events';
import fetchInitialData from 'hoc/fetchInitialData';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'recompose';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia, Paper, ListItem} from '@material-ui/core';
import Venue from '@material-ui/icons/PinDrop';
import Event from '@material-ui/icons/Event';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';

import style from './EventList.scss';

function searchingFor(term) {
  return function (x) { // eslint-disable-line
    return x.name.toLowerCase().includes(term.toLowerCase());
  };
}

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
    marginBottom: '15px',
    padding: 10,
    '&:hover': {
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
      cursor: 'pointer'
    }
  },
  butt: {
    float: 'right'
  },
  CardMedia: {
    height: '200px',
    marginLeft: '5px',
    objectFit: 'cover'
  },
  CardImage: {
    height: '200px',
    width: '100%',
    border: '1px solid #eee',
    objectFit: 'contain'
  },
  title2: {
    paddingTop: 10,
    boxShadow: 'none'
  },
  filter: {
    padding: 30,
    marginTop: 5
  },
  AnnouncementContent: {
    height: '175px',
    overflow: 'hidden',
    marginLeft: '20px',
    marginTop: '10px',
    textAlign: 'justify'
  },
  Avatar: {
    height: '100px',
    width: '100px',
    marginTop: '5px'
  },
  ColumnTitle: {
    marginTop: '15px',
    textAlign: 'center'
  },
  ColumnSubTitle: {
    marginLeft: '33px'
  },
  RelativeTime: {
    marginLeft: '1px',
    marginTop: '40px',
    textAlign: 'center'
  }
};

class EventList extends Component {
  static propTypes = {
    events: PropTypes.array,
    classes: PropTypes.object
  };
  static defaultProps = {
    events: []
  };
  state = {
    pageCount: 20,
    term: ''
  };
  searchHandler = (event) => {
    this.setState({term: event.target.value});
  };
  render() {
    const {events, classes} = this.props;
    Moment.locale('en');
    return (
      <TopBarAndFooter>
        <div className={style.ChildContainer}>
          <Grid container>
            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.content} >
              <Paper className={classes.filter}>
                <Typography variant="h6" >
                  Filter Events
                </Typography>
                <form>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="search"
                      component={renderTextField}
                      label="Search Events"
                      fullWidth
                      className={styles.searchField}
                      onChange={this.searchHandler}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      name="date_added"
                      component={renderSelectField}
                      label="Date Added"
                      fullWidth
                    >
                      <option value="" />
                      <option value={1}>Newest</option>
                      <option value={1}>Oldest</option>
                    </Field>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12} className={classes.content} >

              <Grid container spacing={0}>
                {events.filter(searchingFor(this.state.term)).map((event) => {
                  return (
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                      <Link key={event.id} to={'/events/' + event.id}>
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
                      </Link>
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
  withFetchInitialData,
  withStyles(styles),
  reduxForm({
    form: 'Filter',
    overwriteOnInitialValuesChange: true,
    destroyOnUnmount: false
  })
)(EventList);
