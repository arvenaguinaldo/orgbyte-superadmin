import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

import {submit} from 'redux-form';

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

class RemoteSubmit extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    valid: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    submitForm: PropTypes.string.isRequired
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
    const {classes, loading, success, valid, children, className, submitForm, dispatch} = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <div className={classNames(classes.wrapper, className)}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading || valid}
          onClick={() => dispatch(submit(submitForm))}
        >
          {children}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} value={this.state.completed} />}
      </div>
    );
  }
}

export default compose(
  connect(null, null),
  withStyles(styles)
)(RemoteSubmit);
