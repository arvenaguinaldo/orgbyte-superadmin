import React, {Component} from 'react';
import Notification from 'containers/Notification/Notification';
import EditModals from 'containers/EditModals/EditModals';
import MainRoutes from 'router/MainRoutes';

class App extends Component {
  render() {
    return (
      <div>
        <Notification />
        <EditModals />
        <MainRoutes />
      </div>
    );
  }
}

export default App;
