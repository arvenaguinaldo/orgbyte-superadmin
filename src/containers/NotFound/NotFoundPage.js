import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1>Page Not Found!</h1>
        <h3>Click <Link to="/">here</Link> to go back GitHub Repo Search page</h3>
      </div>
    );
  }
}

export default NotFoundPage;
