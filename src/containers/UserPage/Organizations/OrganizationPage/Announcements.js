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
    width: '1200px',
    height: '200px',
    margin: '5px',
    padding: '0px',
    '&:hover': {
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
      cursor: 'pointer'
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
  },
  CardMedia: {
    height: '100%',
    marginLeft: '5px',
    objectFit: 'cover'
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
  },
  timeAgoSpan: {
    color: '#7e7e7e',
    fontSize: 16
  },
  Content: {
    marginTop: 25
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
                    <Grid item md={2} sm={12} xs={12}>
                      <CardMedia
                        className={classes.CardMedia}
                        image={'https://s3-ap-southeast-1.amazonaws.com/orgbyte/' + this.state.image_blobs[0].key}
                        title="Announcement"
                      />
                    </Grid>
                    <Grid item md={8} sm={12} xs={12}>
                      <div className={classes.AnnouncementContent}>
                        <Typography variant="h6">
                          {ann.title}  <span className={classes.timeAgoSpan}>( posted <TimeAgo date={ann.starts} formatter={formatter} /> ) </span>
                        </Typography>
                        <Typography variant="body1" className={classes.Content}>
                          {ann.content}
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
