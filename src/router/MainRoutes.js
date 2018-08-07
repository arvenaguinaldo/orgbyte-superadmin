import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';

// Components / Pages
import Login from 'containers/Login/Login';
import Home from 'containers/Home/Home';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
         sideBarLayout
        <Route path="/login" component={Login} exact />
         develop
      </Switch>
    );
  }
}

export default MainRoutes;
