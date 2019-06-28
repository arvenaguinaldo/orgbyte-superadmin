import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TimeAgo from 'react-timeago';
import English from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectAnnouncement, makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';
import {fetchAnnouncement} from 'redux/actions/announcements';
import fetchInitialData from 'hoc/fetchInitialData';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {Grid, CardMedia} from '@material-ui/core';

import TopBarAndFooter from '../../layouts/TopBarAndFooter';

const formatter = buildFormatter(English);
const backgroundImage = 'https://i.postimg.cc/nh2GRKcZ/SWITS_Logo.png';
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
    marginTop: 10
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
    padding: 10
  },
  butt: {
    float: 'right'
  },
  CardMedia: {
    height: '100%',
    marginLeft: '5px',
    objectFit: 'cover',
    textAlign: 'center'
  },
  CardImage: {
    height: '500px',
    width: '100%',
    border: '1px solid #eee',
    objectFit: 'contain'
  },
  AnnouncementContent: {
    marginLeft: '20px',
    marginTop: '10px',
    textAlign: 'justify'
  },
  ColumnTitle: {
    marginTop: '50px',
    textAlign: 'center'
  },
  ColumnSubTitle: {
    textAlign: 'center'
  },
  RelativeTime: {
    marginLeft: '1px',
    marginTop: '40px',
    textAlign: 'center'
  },
  OrgImage: {
    backgroundImage: 'url(' + backgroundImage + ')',
    backgroundSize: 'cover',
    height: '170px',
    width: '170px',
    display: 'inline-block'
  },
  PostedBy: {
    textAlign: 'center'
  }
};

class AnnouncementPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    announcement: PropTypes.object
  };

  static defaultProps = {
    announcement: {}
  };
  render() {
    const {classes, announcement} = this.props;
    return (
      <TopBarAndFooter>
        <div style={{height: 50}} />
        <Typography variant="h4" className={classes.header} >{announcement.title}</Typography>
        <Grid container >
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.content} >

            <Grid container spacing={0}>
              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Card className={classes.paper2}>
                  <Grid container spacing={0}>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Card className={classes.CardImage}>
                        <CardMedia
                          className={classes.CardMedia}
                          image="https://i.postimg.cc/J7HQP4KL/miah1.png"
                          title="Announcement"
                        />
                      </Card>
                    </Grid>
                    <Grid item lg={7} md={7} xs={12}>
                      <Grid container spacing={24}>
                        <Grid item lg={12} md={12} xs={12}>
                          <div className={classes.AnnouncementContent}>
                            <Typography variant="body1">
                              {announcement.content}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                          <div className={classes.PostedBy}>
                            <Typography variant="h4" className={classes.ColumnTitle}>
                                 Posted by
                            </Typography>
                            <div className={classes.OrgImage} />
                            <Typography variant="subtitle1" className={classes.ColumnSubTitle}>
                              {announcement.organization_acronym}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                          <div>
                            <Typography variant="h4" className={classes.ColumnTitle}>
                                Activity
                            </Typography>
                            <Typography variant="h5" className={classes.RelativeTime}>
                              <TimeAgo date={announcement.starts} formatter={formatter} />
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TopBarAndFooter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  announcement: makeSelectAnnouncement(),
  meta: makeSelectAnnouncementsMeta()
});

// const mapDispatchToProps = {
//   fetchAnnouncement
// };

const withRedux = connect(mapStateToProps, {fetchAnnouncement});

const withFetchInitialData = fetchInitialData((props) => {
  const {match: {params}} = props;
  props.fetchAnnouncement(params.id);
});

export default compose(
  withRedux,
  withFetchInitialData,
  withStyles(styles)
)(AnnouncementPage);
