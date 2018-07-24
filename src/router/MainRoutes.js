import React, {Component} from 'react';

// Routes
import {Switch, Route} from 'react-router-dom';

// Components / Pages
import Home from 'containers/Home/Home';
import EventList from 'containers/Events/EventList';
import NotFoundPage from 'containers/NotFound/NotFoundPage';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/events" component={EventList} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
