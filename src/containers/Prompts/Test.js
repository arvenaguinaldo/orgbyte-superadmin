import React from 'react';
import Prompts from '../../components/Notifications/Prompts.js';


class Test extends React.Component {
    state ={
      open: true,
      variant: 'success',
      message: 'Completed'
    }
    render() {
      return (
        <Prompts
          variant={this.state.variant}
          message={this.state.message}
          open={this.state.open}
        />
      );
    }
}

export default Test;
