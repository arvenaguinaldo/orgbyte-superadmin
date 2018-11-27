import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './Spinner.scss';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Spinner extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

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
    const {classes} = this.props;
    return (
      <div className={style.wrapper}>
        <CircularProgress
          className={classNames(classes.progress, style.spinner)}
          color="primary"
          variant="determinate"
          size={50}
          value={this.state.completed}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Spinner);
