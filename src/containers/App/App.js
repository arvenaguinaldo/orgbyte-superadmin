import React, {Component} from 'react';
import Notification from 'containers/Notification/Notification';
import MainRoutes from 'router/MainRoutes';


class App extends Component {
  render() {
    return (
      <div>
        <Notification />
        <MainRoutes />
      </div>
    );
  }
}

export default App;
