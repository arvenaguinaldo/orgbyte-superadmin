import React, {Component} from 'react';
import Center from 'react-center';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';

const style = {
  container: {
    marginTop: '15%'
  },
  logo: {
    width: '20%'
  }
};

class NotFoundPage extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <Center>
          <img src="https://i.postimg.cc/59CnSdDj/logo23.png" alt="logo" className={classes.logo} />
        </Center>
        <Center>
          <Typography variant="h2">Page Not Found!</Typography>
        </Center>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(style)(NotFoundPage);
