import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectAnnouncementsList, makeSelectAnnouncementsMeta} from 'redux/selectors/announcements';
import {fetchAnnouncements} from 'redux/actions/announcements';

import fetchInitialData from 'hoc/fetchInitialData';
import TimeAgo from 'react-timeago';
import English from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid, CardMedia} from '@material-ui/core';
import Button from '@material-ui/core/Button';

// import UserAvatar from 'react-user-avatar';
// import Center from 'react-center';

import style from './Announcement.scss';

const formatter = buildFormatter(English);

class Announcements extends Component {
  static propTypes = {
    announcements: PropTypes.array.isRequired
  };

  static defaultProps = {
    announcements: []
  };

  render() {
    const {announcements} = this.props;

    return (
      <div className={style.ChildContainer}>
        <Grid container spacing={8}>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant="h5" className={style.SectionHeading}>
              ANNOUNCEMENTS
            </Typography>
          </Grid>
          <Grid container spacing={0}>
            {announcements.slice(0, 3).map((ann) => {
              return (
                <Grid item md={4} sm={12} xs={12} key={ann.id}>
                  <Link key={ann.id} to={'/announcements/' + ann.id}>
                    <Grid container spacing={0}>
                      <Grid item md={12} sm={12} xs={12} key={ann.id}>
                        <Card className={style.paper2} key={ann.id}>
                          <Grid container spacing={16}>
                            <Grid item md={4} sm={4} xs={4}>
                              <Card className={style.CardImage}>
                                <CardMedia
                                  className={style.CardMedia}
                                  image="https://i.postimg.cc/J7HQP4KL/miah1.png"
                                  title="Announcement"
                                />
                              </Card>
                            </Grid>
                            <Grid item md={8} sm={8} xs={8}>
                              <div className={style.AnnouncementDetails}>
                                <div className={style.Title}>
                                  <Typography variant="h5">
                                    {ann.title}
                                  </Typography>
                                </div>
                                <div className={style.RelativeTime}>
                                  <Typography variant="h5" color="textSecondary">
                                    <TimeAgo date={ann.starts} formatter={formatter} />
                                  </Typography>
                                </div>
                                <div className={style.Author}>
                                  <Typography variant="body1">
                                      by {(ann.organization_name)}
                                  </Typography>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <div className={style.AnnouncementButton}>
          <Link to={'/announcements/'}>
            <Button size="small" variant="contained" color="primary">
              See more
            </Button>
          </Link>
        </div>

      </div>
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
)(Announcements);
