import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import TimeAgo from 'react-timeago';
import English from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderSelectField} from 'components/ReduxMaterialUiForms/ReduxMaterialUiForms';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectAnnouncementsList, makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';
import {fetchAnnouncements} from 'redux/actions/announcements';

import fetchInitialData from 'hoc/fetchInitialData';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import {Grid, CardMedia, Paper} from '@material-ui/core';
import TopBarAndFooter from '../../layouts/TopBarAndFooter';

function searchingFor(term) {
  return function (x) { // eslint-disable-line
    return x.title.toLowerCase().includes(term.toLowerCase());
  };
}

const formatter = buildFormatter(English);
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

class AnnouncementList extends Component {
 static propTypes = {
   announcements: PropTypes.array.isRequired,
   classes: PropTypes.object.isRequired
 };

  static defaultProps = {
    announcements: []
  };
  state = {
    term: ''
  }
  handleDayRange = (value) => {
    const nature = {value};

    if (nature.value === '1') {
      this.setState({nature: 'curricular'});
    } else if (nature.value === '2') {
      this.setState({nature: 'co_curricular'});
    } else { this.setState({nature: 'reset'}); }
  };

  searchHandler = (event) => {
    this.setState({term: event.target.value});
  };
  render() {
    const {announcements, classes} = this.props;
    const today = moment(moment().toString()).format('YYYY-MM-DD h:mm a');
    return (
      <TopBarAndFooter>
        <Typography variant="h4" className={classes.header} >Announcements</Typography>
        <Grid container >
          <Grid item lg={3} md={3} sm={12} xs={12} className={classes.content} >
            <Paper className={classes.filter}>
              <Typography variant="h6" >
                  Filter Announcements
              </Typography>
              <form>
                <Grid item xs={12} sm={12} md={12}>
                  <Field
                    name="search"
                    component={renderTextField}
                    label="Search Announcements"
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

            <Grid container spacing={16}>
              <Grid item lg={12} md={12} sm={12} xs={12} >
                {announcements.filter(searchingFor(this.state.term)).filter(ann => (moment(ann.starts).format('YYYY-MM-DD h:mm a') < today ? ann : null)).sort((a, b) => (new Date(b.starts) - new Date(a.starts))).map((ann) => {
                  return (
                    <Link key={ann.id} to={'/announcements/' + ann.id}>
                      <Card className={classes.paper2} key={ann.id}>
                        <Grid container spacing={0}>
                          <Grid item lg={2} md={4} sm={12} xs={12}>
                            <Card className={classes.CardImage}>
                              <CardMedia
                                className={classes.CardMedia}
                                image="https://i.postimg.cc/J7HQP4KL/miah1.png"
                                title="Announcement"
                              />
                            </Card>
                          </Grid>
                          <Grid item lg={6} md={6} xs={12}>
                            <div className={classes.AnnouncementContent}>
                              <Typography variant="h6">
                                {ann.title}
                              </Typography>
                              <Typography variant="body1">
                                {ann.content}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item lg={3} md={3} xs={12}>
                            <Grid container justify="center">
                              <div>
                                <Typography variant="body1" className={classes.ColumnTitle}>
                                   Posted by
                                </Typography>
                                <Avatar
                                  alt="Organization Logo"
                                  src="https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png"
                                  className={classes.Avatar}
                                />
                                <Typography variant="caption" className={classes.ColumnSubTitle}>
                                  {ann.organization_acronym}
                                </Typography>
                              </div>
                            </Grid>
                          </Grid>
                          <Grid item lg={1} md={1} xs={12}>
                            <div>
                              <Typography variant="body1" className={classes.ColumnTitle}>
                                   Activity
                              </Typography>
                              <Typography variant="caption" className={classes.RelativeTime}>
                                <TimeAgo date={ann.starts} formatter={formatter} />
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </Card>
                    </Link>
                  );
                })}

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TopBarAndFooter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  announcements: makeSelectAnnouncementsList(),
  meta: makeSelectAnnouncementsMeta()
});

const withRedux = connect(mapStateToProps, {fetchAnnouncements});

const withFetchInitialData = fetchInitialData((props) => {
  props.fetchAnnouncements();
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
)(AnnouncementList);
