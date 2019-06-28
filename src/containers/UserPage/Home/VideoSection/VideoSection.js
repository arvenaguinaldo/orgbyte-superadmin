import React, {Component} from 'react';
import {Player, BigPlayButton} from 'video-react';
// import ReactPlayer from 'react-player';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import Poster from 'assets/images/orgbyte-player-poster.png';

// import UserAvatar from 'react-user-avatar';
// import Center from 'react-center';

import style from './VideoSection.scss';


class VideoSection extends Component {


  render() {

    return (
      <div className={style.ChildContainer}>
        <Grid container spacing={8}>
          <Grid item md={12} sm={12} xs={12}>
            <Typography variant="h5" className={style.SectionHeading} gutterBottom>
              WHAT IS ORGYBYTE?
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <div className={style.playerContainer}>
            <Player
              width="50%"
              height="50%"
              poster={Poster}
            >
              <source src="https://orgbyte.s3-ap-southeast-1.amazonaws.com/about-orgbyte.mp4" />
              <BigPlayButton position="center" />
            </Player>
            {/* <ReactPlayer url="https://youtu.be/TQXMMlSPJ-0" playing /> */}
          </div>
        </Grid>


      </div>
    );
  }
}

export default VideoSection;
