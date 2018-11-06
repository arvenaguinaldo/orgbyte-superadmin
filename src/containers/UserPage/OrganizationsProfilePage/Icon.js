import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const styles = {
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: '50%',
    height: '50%'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
};

function IconAvatars(props) {
  const {classes} = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="SWITS"
        src="https://i.postimg.cc/CxzJrZ0J/SWITS-Logo.png"
        className={classNames(classes.bigAvatar)}
      />
    </div>
  );
}

IconAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconAvatars);
