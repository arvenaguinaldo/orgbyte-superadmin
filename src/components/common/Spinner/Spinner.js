import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import style from './Spinner.scss';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Spinner extends React.Component {
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
    return (
      <div className={style.wrapper}>
        <img src="https://i.postimg.cc/mkkMQFH3/asde.gif" alt="spinner" className={style.spinner} />
      </div>
    );
  }
}

export default withStyles(styles)(Spinner);
