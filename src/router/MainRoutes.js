import React, {Component} from 'react';

// Routes
import {Switch, Route, Redirect} from 'react-router-dom';

// Components
import NotFoundPage from 'containers/NotFound/NotFoundPage';
import EventList from 'containers/Events/EventList';

class MainRoutes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/events" />
        <Route path="/events" component={EventList} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;
