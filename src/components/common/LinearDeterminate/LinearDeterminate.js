import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class LinearDeterminate extends React.Component {

  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer = null;

  progress = () => {
    const {completed} = this.state;
    if (completed === 100) {
      this.setState({completed: 0});
    } else {
      const diff = Math.random() * 10;
      this.setState({completed: Math.min(completed + diff, 100)});
    }
  };

  render() {
    return (
      <div>
        {console.log('loading')}
        <LinearProgress color="primary" variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

export default (LinearDeterminate);
