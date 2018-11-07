import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

import CircularProgress from '@material-ui/core/CircularProgress';


const styles = ({
  wrapper: {
    display: 'inline-block'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'relative',
    left: '-63%',
    bottom: -8,
    marginRight: -25
    // marginLeft: '-95%'
  }
});

class SubmitButton extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    valid: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  }

  state = {
    completed: 0
  };


  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer = null;

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  };

  render() {
    const {classes, loading, success, valid, children, className} = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <div className={classNames(classes.wrapper, className)}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading || valid}
          type="submit"
          fullWidth
        >
          {children}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} value={this.state.completed} />}
      </div>
    );
  }
}

export default withStyles(styles)(SubmitButton);
