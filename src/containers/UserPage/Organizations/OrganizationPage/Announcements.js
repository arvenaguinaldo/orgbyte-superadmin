import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectAnnouncementsList, makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';
import {fetchAnnouncements} from 'redux/actions/announcements';
import fetchInitialData from 'hoc/fetchInitialData';

// Material UI
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia} from '@material-ui/core';
import {Link} from 'react-router-dom';

import TimeAgo from 'react-timeago';
import English from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';


const formatter = buildFormatter(English);

const styles = {
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
    padding: '0px',
    '&:hover': {
      boxShadow: '1px 6px 20px 6px rgba(0,0,0,0.35)'
    }
  },
  butt: {
    float: 'right'
  },
  annou: {
    width: '100%',
    height: '100%'
  },
  image2: {
    backgroundColor: 'blue',
    height: '100px  '
  },
  title2: {
    paddingTop: 10,
    boxShadow: 'none'
  }
};

class Announcements extends Component {
  static propTypes = {
    announcements: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    announcements: []
  };
  render() {
    const {classes, announcements} = this.props;
    return (
      <Card className={classes.card}>
        <Grid container spacing={0}>
          {announcements.map((ann) => {
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
      </Card>
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
  withStyles(styles)
)(Announcements);
