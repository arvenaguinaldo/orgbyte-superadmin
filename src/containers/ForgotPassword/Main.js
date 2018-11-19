import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Center from 'react-center';
import Forgot from './ForgotPassword';

const style = {
  whole: {
    height: '100%',
    width: '100%'
  }
};

class HomePage extends Component {
    static propTypes = {
      classes: PropTypes.object.isRequired
    };
    render() {
      const {classes} = this.props;
      return (
        <div className={classes.whole}>
          <Center>
            <Forgot />
          </Center>
        </div>
      );
    }
}

export default withStyles(style)(HomePage);
