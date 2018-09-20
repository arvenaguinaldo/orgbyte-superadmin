import React from 'react';
import Prompts from 'components/Notifications/Notification';


class Test extends React.Component {
    state ={
      open: true,
      variant: 'success',
      message: 'Completed'
    }
    render() {
      return (
        <Prompts
          variant="success"
          message="yehey"
        />
      );
    }
}

export default Test;
