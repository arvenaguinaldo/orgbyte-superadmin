import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Banner from 'react-banner';
import 'react-banner/dist/style.css';

const styles = {
  root: {
    flexGrow: 1
  }
};

function SimpleAppBar(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <Banner
        className={classes.banner}
        logo="ORGBYTE"
        url={window.location.pathname}
        links={[

          {title: 'HOME', url: './'},
          {title: 'ANNOUNCEMENTS', url: '/announcement'},
          {title: 'EVENTS', url: '/Events'},
          {title: 'ORGANIZATIONS', url: '/orgs'}

        ]}
      />
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
