import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';

// Components / Pages
import Home from 'containers/UserPage/Main';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>

        <Route path="/" component={Home} exact />
      </Switch>
    );
  }
}

export default MainRoutes;
