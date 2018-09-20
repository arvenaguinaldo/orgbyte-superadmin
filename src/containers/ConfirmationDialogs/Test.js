import React from 'react';
import Responsivedialog from './ConfirmationDialog.js';


class Test extends React.Component {
    state ={
      open: true
    }
    alertMe = () => {
      this.setState({open: false});
    };
    render() {
      return (
        <Responsivedialog
          open={this.state.open}
          title="Delete"
          message="Are u sure"
          alertMe={this.alertMe.bind(this)}
        />
      );
    }
}

export default Test;
