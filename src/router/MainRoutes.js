import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';

// Components / Pages
import Login from 'containers/Login/Login';
import Home from 'containers/Home/Home';
import UserPage from 'containers/UserPage/Main';
import Events from 'containers/Events/Events';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
         sideBarLayout
        <Route path="/login" component={Login} exact />
         develop
        <Route path="/Main" component={UserPage} exact />
        <Route path="/Events" component={Events} exact />
      </Switch>
    );
  }
}

export default MainRoutes;
